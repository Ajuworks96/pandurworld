import os
import math
from PIL import Image, ImageFilter, ImageDraw, ImageEnhance, ImageOps
import numpy as np

def create_surface_texture(width, height, surface_type="dark_slate"):
    """
    Generates realistic food photography surfaces (walnut wood, dark slate, cream parchment, marble, espresso oak).
    """
    img = Image.new("RGBA", (width, height), (15, 10, 8, 255))
    arr = np.zeros((height, width, 3), dtype=np.float32)
    
    y_coords, x_coords = np.ogrid[:height, :width]
    
    if surface_type == "dark_slate":
        # Deep dark basalt slate with fine stone grain and directional key light
        base_color = np.array([22, 16, 14])
        noise = np.random.normal(0, 8, (height, width, 3))
        # Subtle horizontal stone grain
        grain = np.sin(x_coords * 0.05 + y_coords * 0.02) * 5
        arr = base_color + noise + grain[:, :, np.newaxis]
        
    elif surface_type == "walnut_wood":
        # Rich warm walnut wood with linear wood grain
        base_color = np.array([45, 26, 16])
        wood_grain = np.sin(y_coords * 0.08 + np.sin(x_coords * 0.01) * 10) * 15
        noise = np.random.normal(0, 6, (height, width, 3))
        arr = base_color + wood_grain[:, :, np.newaxis] + noise
        arr[:, :, 0] += 8 # Warm tone boost
        
    elif surface_type == "cream_parchment":
        # Muted cream bakery parchment paper
        base_color = np.array([42, 34, 26])
        noise = np.random.normal(0, 5, (height, width, 3))
        arr = base_color + noise
        
    elif surface_type == "espresso_oak":
        # Deep espresso coffee house wood surface
        base_color = np.array([28, 18, 12])
        noise = np.random.normal(0, 7, (height, width, 3))
        arr = base_color + noise
        
    elif surface_type == "ruby_linen":
        # Soft neutral linen with subtle berry tint
        base_color = np.array([32, 20, 22])
        noise = np.random.normal(0, 6, (height, width, 3))
        arr = base_color + noise
        
    elif surface_type == "bakery_peel":
        # Aged golden bakery wooden peel
        base_color = np.array([50, 32, 18])
        wood_grain = np.sin(y_coords * 0.06) * 12
        noise = np.random.normal(0, 5, (height, width, 3))
        arr = base_color + wood_grain[:, :, np.newaxis] + noise

    else:
        # Default dark cocoa surface
        base_color = np.array([20, 14, 10])
        arr = base_color + np.random.normal(0, 6, (height, width, 3))

    # Add soft radial studio key light (top-left key light)
    light_x, light_y = width * 0.35, height * 0.35
    dist_from_light = np.sqrt((x_coords - light_x)**2 + (y_coords - light_y)**2)
    max_dist = math.sqrt(width**2 + height**2)
    vignette = 1.0 - 0.45 * (dist_from_light / max_dist)
    
    arr = arr * vignette[:, :, np.newaxis]
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    
    return Image.fromarray(arr, mode="RGB").convert("RGBA")


def compose_commercial_food_photo(
    cookie_path,
    output_path,
    surface_type="dark_slate",
    scale_factor=1.0,
    offset_x=0,
    offset_y=0,
    rotation=0,
    add_shadow=True,
    props=None
):
    """
    Composes a commercial food photography scene where the cookie sits naturally on a realistic surface with contact shadows.
    """
    if not os.path.exists(cookie_path):
        print(f"Cookie path missing: {cookie_path}")
        return

    canvas_w, canvas_h = 800, 800
    canvas = create_surface_texture(canvas_w, canvas_h, surface_type)
    
    # Load cookie PNG
    cookie_img = Image.open(cookie_path).convert("RGBA")
    
    # Apply rotation
    if rotation != 0:
        cookie_img = cookie_img.rotate(rotation, resample=Image.BICUBIC, expand=True)

    # Scale cookie
    orig_w, orig_h = cookie_img.size
    target_w = int(orig_w * scale_factor)
    target_h = int(orig_h * scale_factor)
    cookie_scaled = cookie_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Calculate center placement
    pos_x = (canvas_w - target_w) // 2 + offset_x
    pos_y = (canvas_h - target_h) // 2 + offset_y

    if add_shadow:
        # Create realistic contact shadow + ambient occlusion underneath cookie
        shadow = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        
        # Contact shadow oval directly beneath cookie base
        sh_w = int(target_w * 0.85)
        sh_h = int(target_h * 0.35)
        sh_x = pos_x + (target_w - sh_w) // 2
        sh_y = pos_y + target_h - int(sh_h * 0.6)
        
        shadow_draw.ellipse([sh_x, sh_y, sh_x + sh_w, sh_y + sh_h], fill=(5, 3, 2, 210))
        
        # Soft ambient shadow spread
        amb_w = int(target_w * 1.1)
        amb_h = int(target_h * 0.5)
        amb_x = pos_x + (target_w - amb_w) // 2
        amb_y = pos_y + target_h - int(amb_h * 0.5)
        shadow_draw.ellipse([amb_x, amb_y, amb_x + amb_w, amb_y + amb_h], fill=(0, 0, 0, 110))
        
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=18))
        canvas.alpha_composite(shadow)

    # Paste cookie onto surface
    canvas.alpha_composite(cookie_scaled, (pos_x, pos_y))
    
    # Save final webp/png asset
    canvas.save(output_path, "PNG")
    print(f"Successfully generated commercial photo composition: {output_path}")


if __name__ == "__main__":
    base = "/Users/arjun/Pandur world/public/images"

    # 1. Hero Commercial Scene (Partially offset hero on dark slate with soft ambient shadow)
    compose_commercial_food_photo(
        f"{base}/hero/hero-cookie.png",
        f"{base}/hero/pandur-hero-master.png",
        surface_type="dark_slate",
        scale_factor=0.95,
        offset_x=20,
        offset_y=10,
        rotation=-4
    )

    # 2. Product 01: Double Dark Cocoa (Close-up Macro on Dark Basalt Stone)
    compose_commercial_food_photo(
        f"{base}/products/double-dark.png",
        f"{base}/products/pandur-double-dark.png",
        surface_type="dark_slate",
        scale_factor=1.05,
        offset_x=-10,
        offset_y=0,
        rotation=3
    )

    # 3. Product 02: Salted Caramel Velvet (45° Tabletop Editorial on Warm Walnut Wood)
    compose_commercial_food_photo(
        f"{base}/products/salted-caramel.png",
        f"{base}/products/pandur-salted-caramel.png",
        surface_type="walnut_wood",
        scale_factor=0.98,
        offset_x=15,
        offset_y=15,
        rotation=-6
    )

    # 4. Product 03: Pistachio White Honey (Top-Down Flat Lay on Cream Parchment)
    compose_commercial_food_photo(
        f"{base}/products/pistachio-honey.png",
        f"{base}/products/pandur-pistachio-honey.png",
        surface_type="cream_parchment",
        scale_factor=0.92,
        offset_x=0,
        offset_y=-10,
        rotation=12
    )

    # 5. Product 04: Hazelnut Praline (Low-Angle Food Photography on Deep Espresso Wood)
    compose_commercial_food_photo(
        f"{base}/products/hazelnut-praline.png",
        f"{base}/products/pandur-hazelnut-praline.png",
        surface_type="espresso_oak",
        scale_factor=1.02,
        offset_x=-20,
        offset_y=10,
        rotation=-8
    )

    # 6. Product 05: Vanilla Bean Crunch (Bakery Style on Golden Wood)
    compose_commercial_food_photo(
        f"{base}/products/vanilla-bean.png",
        f"{base}/products/pandur-vanilla-bean.png",
        surface_type="bakery_peel",
        scale_factor=0.90,
        offset_x=10,
        offset_y=-5,
        rotation=5
    )

    # 7. Product 06: Espresso Roast (Café Editorial on Dark Espresso Wood)
    compose_commercial_food_photo(
        f"{base}/products/espresso-roast.png",
        f"{base}/products/pandur-espresso-roast.png",
        surface_type="espresso_oak",
        scale_factor=0.96,
        offset_x=-15,
        offset_y=20,
        rotation=-12
    )

    # 8. Product 07: Ruby Berry Crumb (Flat Lay on Neutral Linen)
    compose_commercial_food_photo(
        f"{base}/products/ruby-berry.png",
        f"{base}/products/pandur-ruby-berry.png",
        surface_type="ruby_linen",
        scale_factor=0.94,
        offset_x=12,
        offset_y=-12,
        rotation=15
    )

    # 9. Product 08: Spiced Honey Pecan (Autumn Bakery Peel)
    compose_commercial_food_photo(
        f"{base}/products/spiced-pecan.png",
        f"{base}/products/pandur-spiced-pecan.png",
        surface_type="bakery_peel",
        scale_factor=1.00,
        offset_x=0,
        offset_y=10,
        rotation=-5
    )
