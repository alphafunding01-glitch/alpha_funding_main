import os
import re

# Mapping of hex codes to variable names (without prefix)
# e.g. 'f0f0f0': 'light-gray' -> bg-light-gray
COLOR_MAP = {
    'f0f0f0': 'light-gray',
    'fafafa': 'bg-subtle',
    '9166aa': 'brand-purple',
    'f27738': 'brand-orange',
    '62c1a5': 'brand-teal',
    '0f5946': 'brand-dark-green',
    '707070': 'muted-strong',
    '6677a2': 'muted-blue',
    'efd964': 'nav-cta',
}

def replace_colors(content):
    new_content = content
    for hex_code, var_name in COLOR_MAP.items():
        # Case insensitive regex for bg-[#hex], text-[#hex], border-[#hex]
        # We handle both upper and lower case hex in file
        
        # Pattern: (bg|text|border)-\[#<hex>\]
        # We need to match exact hex code
        pattern = re.compile(f'(bg|text|border)-\[#{hex_code}\]', re.IGNORECASE)
        
        def replacement(match):
            prefix = match.group(1) # bg, text, or border
            return f'{prefix}-{var_name}'
            
        new_content = pattern.sub(replacement, new_content)
        
        # Also handle bare hex codes if they appear in style={{ color: "#..." }} ?
        # The user specifically asked for "control from globals.css", which implies Tailwind classes or CSS vars.
        # For inline styles, we might need var(--color-name).
        # Let's stick to Tailwind classes first as that's the bulk of it.
        
    return new_content

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = replace_colors(content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    base_dir = r"c:\Users\muneb\Downloads\Alpha-funding\Alpha-main\src"
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".jsx"):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
