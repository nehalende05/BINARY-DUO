# Placeholder asset generator (not shipped). Run: python3 gen_assets.py
# Draws 16x16 sprites from the pixel maps below, synthesises 8-bit SFX, and rewrites the
# ASSETS block in index.html. Replace any entry with your PixelLab / jsfxr export later.
import base64, io, math, random, re, struct, wave
from PIL import Image

PAL = {
    'k': '#14121f', 's': '#f6c89f', 'S': '#d99c72', 'e': '#14121f', 'c': '#ff8e8e', 'm': '#7a2e3a',
    'b': '#eceaf5', 'B': '#b4b0c8', 'Y': '#ffd60a', 'y': '#c79a00', 'W': '#fff6c2',
}
HATS = {'blue': ('#9fd3ff', '#2997ff', '#1662b8'), 'red': ('#ffb0a8', '#ff453a', '#b8231b')}

FACE = [
    '.kLHHHHHHHHHHhk.',
    '..khhhhhhhhhhk..',
    '..kssssssssssk..',
    '..kssessssessk..',
    '..kssessssessk..',
]
BODY = [
    '....kkbbbbkk....',
    '...kbbbbbbbbk...',
    '...kBbbbbbbBk...',
    '....kkkkkkkk....',
]
VILLAGER = {
    # blue: round cap + smile
    'blue': ['................', '......kkkk......', '....kkLHHHkk....', '...kLLHHHHHhk...', '...kLHHHHHHhk...']
            + FACE + ['..kscsmssmscsk..', '...kSSSmmSSSk...'] + BODY,
    # red: pointy hat + flat grumpy mouth (shape differs too, not just colour)
    'red': ['................', '.......kk.......', '......kLHk......', '.....kLHHhk.....', '....kLHHHHhk....']
           + FACE[:2] + ['..kskksssskksk..', '..kssssssssssk..', FACE[4]]  # brows + squint
           + ['..kscsssssscsk..', '...kSmmmmmmSk...'] + BODY,
}
BADGE = [
    '................', '.kkkkkkkkkkkkkk.', '.kWWYYYYYYYYYyk.', '.kWYYYYYYYYYYyk.', '.kYYYYYYYYYYYyk.',
    '.kYYYYYkkYYYYyk.', '.kYYYYkkkkYYYyk.', '.kYYYYYkkYYYYyk.', '.kYYYYYYYYYYYyk.', '..kYYYYYYYYYyk..',
    '..kYYYYYYYYyyk..', '...kYYYYYYyyk...', '....kYYYYyyk....', '.....kYYyyk.....', '......kyyk......',
    '.......kk.......',
]


def sprite(rows, pal):
    assert len(rows) == 16 and all(len(r) == 16 for r in rows), rows
    im = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch != '.':
                im.putpixel((x, y), Image.new('RGB', (1, 1), pal[ch]).getpixel((0, 0)) + (255,))
    return im


def tile():
    rnd = random.Random(7)
    im = Image.new('RGBA', (16, 16), '#1a1b22')
    for _ in range(14):
        im.putpixel((rnd.randrange(1, 15), rnd.randrange(1, 15)), (0x22, 0x24, 0x2d, 255))
    for i in range(16):
        im.putpixel((i, 0), (0x26, 0x28, 0x33, 255)); im.putpixel((0, i), (0x26, 0x28, 0x33, 255))
        im.putpixel((i, 15), (0x10, 0x11, 0x16, 255)); im.putpixel((15, i), (0x10, 0x11, 0x16, 255))
    return im


def png_uri(im):
    buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
    return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()


RATE = 22050
def tone(segments, vol=0.22):
    """segments: list of (seconds, start_hz, end_hz). Square wave with a short decay per segment."""
    out, phase = [], 0.0
    for dur, f0, f1 in segments:
        n = int(dur * RATE)
        for i in range(n):
            t = i / n
            phase += (f0 + (f1 - f0) * t) / RATE
            env = (1 - t) ** 1.5
            out.append(128 + int(127 * vol * env * (1 if phase % 1 < 0.5 else -1)))
    buf = io.BytesIO(); w = wave.open(buf, 'wb')
    w.setnchannels(1); w.setsampwidth(1); w.setframerate(RATE); w.writeframes(bytes(out)); w.close()
    return 'data:audio/wav;base64,' + base64.b64encode(buf.getvalue()).decode()


def main():
    assets = {
        'villager_blue': png_uri(sprite(VILLAGER['blue'], {**PAL, **dict(zip('LHh', HATS['blue']))})),
        'villager_red': png_uri(sprite(VILLAGER['red'], {**PAL, **dict(zip('LHh', HATS['red']))})),
        'pinned_badge': png_uri(sprite(BADGE, PAL)),
        'tile': png_uri(tile()),
        'title': '',
        'sfx_pin': tone([(0.07, 660, 1320)]),
        'sfx_flip': tone([(0.06, 520, 300)], 0.16),
        'sfx_win': tone([(0.08, 523, 523), (0.08, 659, 659), (0.08, 784, 784), (0.28, 1047, 1047)]),
        'sfx_fail': tone([(0.14, 330, 300), (0.34, 220, 110)]),
        'music': '',
    }
    path = 'index.html'
    html = open(path).read()
    block = 'const ASSETS = {\n' + ''.join(f"  {k}: '{v}',\n" for k, v in assets.items()) + '};'
    html, n = re.subn(r'const ASSETS = \{.*?\n\};', lambda _: block, html, flags=re.S)
    assert n == 1, 'ASSETS block not found'
    open(path, 'w').write(html)
    print({k: len(v) for k, v in assets.items()})


if __name__ == '__main__':
    main()
