import os
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

def create_radial_transparent_png(input_path, output_path, inner_radius_pct=0.68, outer_radius_pct=0.92):
    """
    Creates a smooth transparent PNG vignette around the cookie,
    removing all square background edges while preserving the central cookie and crumbs.
    """
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return

    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create radial alpha mask
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    center_x, center_y = width / 2, height / 2
    max_radius = min(width, height) / 2
    
    inner_r = max_radius * inner_radius_pct
    outer_r = max_radius * outer_radius_pct
    
    # Generate distance map for smooth alpha gradient
    y, x = np.ogrid[:height, :width]
    dist_from_center = np.sqrt((x - center_x)**2 + (y - center_y)**2)
    
    # Alpha calculation
    alpha = np.zeros((height, width), dtype=np.uint8)
    
    # Fully opaque inside inner_r
    alpha[dist_from_center <= inner_r] = 255
    
    # Smooth fade between inner_r and outer_r
    fade_zone = (dist_from_center > inner_r) & (dist_from_center < outer_r)
    fade_val = 255 * (1.0 - (dist_from_center[fade_zone] - inner_r) / (outer_r - inner_r))
    alpha[fade_zone] = np.clip(fade_val, 0, 255).astype(np.uint8)
    
    # Convert numpy alpha array to PIL Mask image
    mask = Image.fromarray(alpha, mode="L")
    
    # Apply soft blur to mask edge for ultra smooth blending
    mask = mask.filter(ImageFilter.GaussianBlur(radius=8))
    
    # Put mask into image alpha channel
    img.putalpha(mask)
    img.save(output_path, "PNG")
    print(f"Successfully created transparent PNG: {output_path}")

if __name__ == "__main__":
    base_dir = "/Users/arjun/Pandur world/public/images"
    
    # Process Hero Cookie
    create_radial_transparent_png(
        f"{base_dir}/hero/hero-cookie.png",
        f"{base_dir}/hero/hero-cookie-transparent.png",
        inner_radius_pct=0.60,
        outer_radius_pct=0.88
    )
    
    # Process Double Dark (Portal Cookie)
    create_radial_transparent_png(
        f"{base_dir}/products/double-dark.png",
        f"{base_dir}/products/double-dark-transparent.png",
        inner_radius_pct=0.58,
        outer_radius_pct=0.85
    )
    
    # Process Salted Caramel
    create_radial_transparent_png(
        f"{base_dir}/products/salted-caramel.png",
        f"{base_dir}/products/salted-caramel-transparent.png",
        inner_radius_pct=0.58,
        outer_radius_pct=0.85
    )
    
    # Process Pistachio Honey
    create_radial_transparent_png(
        f"{base_dir}/products/pistachio-honey.png",
        f"{base_dir}/products/pistachio-honey-transparent.png",
        inner_radius_pct=0.58,
        outer_radius_pct=0.85
    )
