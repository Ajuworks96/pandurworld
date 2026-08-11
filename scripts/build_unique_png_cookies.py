import os
import math
from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
import numpy as np

def isolate_cookie_to_transparent_png(input_path, output_path, hue_shift=0):
    """
    Isolates the cookie from any background, creating a 100% transparent PNG (Oreo.com style).
    Removes all square boxes, dark tables, slate, and background elements.
    """
    if not os.path.exists(input_path):
        print(f"Input file missing: {input_path}")
        return

    img = Image.open(input_path).convert("RGBA")
    
    # Optional hue adjustment for creating distinct cookie flavors
    if hue_shift != 0:
        hsv = img.convert("HSV")
        h, s, v = hsv.split()
        np_h = np.array(h, dtype=np.int16)
        np_h = (np_h + hue_shift) % 256
        h = Image.fromarray(np_h.astype(np.uint8), mode="L")
        hsv = Image.merge("HSV", (h, s, v))
        img = hsv.convert("RGBA")

    width, height = img.size
    arr = np.array(img)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

    center_x, center_y = width / 2, height / 2
    max_radius = min(width, height) * 0.42

    y_grid, x_grid = np.ogrid[:height, :width]
    dist = np.sqrt((x_grid - center_x)**2 + (y_grid - center_y)**2)

    # Color thresholding to detect background vs cookie
    # Background in our shots is dark espresso/slate (r+g+b < 110 or very low saturation)
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    color_diff = np.abs(r.astype(int) - g.astype(int)) + np.abs(g.astype(int) - b.astype(int))

    # Mask generation
    mask = np.zeros((height, width), dtype=np.float32)

    # Core cookie region (inside max_radius with cookie color)
    is_cookie_color = (luminance > 28) | (color_diff > 8)
    is_inside_radius = dist <= max_radius

    # Inner core is fully opaque
    inner_core = (dist <= max_radius * 0.75) & is_cookie_color
    mask[inner_core] = 1.0

    # Intermediate transition zone
    mid_zone = (dist > max_radius * 0.75) & (dist <= max_radius * 1.05) & is_cookie_color
    fade = 1.0 - (dist[mid_zone] - max_radius * 0.75) / (max_radius * 0.30)
    mask[mid_zone] = np.clip(fade, 0.0, 1.0)

    # Outer region is 100% transparent
    mask[dist > max_radius * 1.05] = 0.0

    # Convert to 0-255 uint8 alpha map
    alpha_map = (mask * 255).astype(np.uint8)

    # Apply Gaussian blur for smooth anti-aliased edge blending (Oreo.com style)
    alpha_img = Image.fromarray(alpha_map, mode="L").filter(ImageFilter.GaussianBlur(radius=3))

    # Put alpha into RGBA image
    img.putalpha(alpha_img)
    
    # Crop tightly to non-zero alpha bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(output_path, "PNG")
    print(f"Exported background-less transparent PNG: {output_path}")

if __name__ == "__main__":
    base = "/Users/arjun/Pandur world/public/images"
    
    # 1. Hero Cookie (Levitating Dark Cocoa & Caramel Drip)
    isolate_cookie_to_transparent_png(
        f"{base}/hero/hero-cookie.png",
        f"{base}/hero/hero-cookie.png"
    )

    # 2. Double Dark (Portal Cookie)
    isolate_cookie_to_transparent_png(
        f"{base}/products/double-dark.png",
        f"{base}/products/double-dark.png"
    )

    # 3. Salted Caramel Velvet
    isolate_cookie_to_transparent_png(
        f"{base}/products/salted-caramel.png",
        f"{base}/products/salted-caramel.png"
    )

    # 4. Pistachio Honey
    isolate_cookie_to_transparent_png(
        f"{base}/products/pistachio-honey.png",
        f"{base}/products/pistachio-honey.png"
    )

    # 5. Create distinct flavor variants for remaining products (Hazelnut, Vanilla, Espresso, Ruby, Spiced Pecan)
    # so every single product has its OWN unique transparent PNG asset!
    
    # Hazelnut Praline (Warm Hazelnut Shift)
    isolate_cookie_to_transparent_png(
        f"{base}/products/double-dark.png",
        f"{base}/products/hazelnut-praline.png",
        hue_shift=15
    )

    # Vanilla Bean (Golden Vanilla Shift)
    isolate_cookie_to_transparent_png(
        f"{base}/products/salted-caramel.png",
        f"{base}/products/vanilla-bean.png",
        hue_shift=10
    )

    # Espresso Roast (Deep Espresso Shift)
    isolate_cookie_to_transparent_png(
        f"{base}/products/double-dark.png",
        f"{base}/products/espresso-roast.png",
        hue_shift=-10
    )

    # Ruby Berry (Berry Cacao Shift)
    isolate_cookie_to_transparent_png(
        f"{base}/products/pistachio-honey.png",
        f"{base}/products/ruby-berry.png",
        hue_shift=140
    )

    # Spiced Pecan (Amber Cinnamon Shift)
    isolate_cookie_to_transparent_png(
        f"{base}/products/salted-caramel.png",
        f"{base}/products/spiced-pecan.png",
        hue_shift=-20
    )
