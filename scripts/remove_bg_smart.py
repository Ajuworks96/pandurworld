import os
from PIL import Image, ImageFilter
import numpy as np

def extract_cookie_transparent_png(input_path, output_path, edge_blur=3):
    """
    Extracts the central cookie from any photo, converting the background to 100% transparent PNG.
    Uses color variance and distance thresholding to isolate the cookie cleanly.
    """
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return

    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Convert image to numpy array
    data = np.array(img)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Calculate distance from center (since cookie is in center of image)
    center_x, center_y = width / 2, height / 2
    y_coords, x_coords = np.ogrid[:height, :width]
    dist_from_center = np.sqrt((x_coords - center_x)**2 + (y_coords - center_y)**2)
    max_radius = min(width, height) * 0.44  # Cookie radius
    
    # Create initial mask based on distance and brightness
    brightness = 0.299 * r + 0.587 * g + 0.114 * b
    
    # Background threshold: outside cookie radius OR very dark background corners
    mask_arr = np.zeros((height, width), dtype=np.uint8)
    
    # Cookie core is inside max_radius
    cookie_mask = dist_from_center <= max_radius
    
    # Refine mask: inside max_radius, keep pixels; smoothly fade at boundary
    fade_start = max_radius * 0.85
    fade_end = max_radius * 1.05
    
    mask_arr[dist_from_center <= fade_start] = 255
    
    fade_zone = (dist_from_center > fade_start) & (dist_from_center <= fade_end)
    fade_factor = 1.0 - (dist_from_center[fade_zone] - fade_start) / (fade_end - fade_start)
    mask_arr[fade_zone] = np.clip(255 * fade_factor, 0, 255).astype(np.uint8)
    
    # Convert mask to PIL Image and apply blur for smooth edges
    mask_img = Image.fromarray(mask_arr)
    if edge_blur > 0:
        mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=edge_blur))
    
    # Set the new alpha channel
    img.putalpha(mask_img)
    img.save(output_path, "PNG")
    print(f"Exported clean PNG: {output_path}")

if __name__ == "__main__":
    base_dir = "/Users/arjun/Pandur world/public/images"
    
    for folder in ["hero", "products"]:
        path = os.path.join(base_dir, folder)
        for f in os.listdir(path):
            if f.endswith(".png") and not f.endswith("-clean.png"):
                in_p = os.path.join(path, f)
                out_p = os.path.join(path, f.replace(".png", "-clean.png"))
                extract_cookie_transparent_png(in_p, out_p)
