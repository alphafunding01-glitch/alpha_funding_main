import os

def replace_in_file(filepath, old, new):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old in content:
            new_content = content.replace(old, new)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def walk_and_replace(directory, old, new):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx"):
                replace_in_file(os.path.join(root, file), old, new)

base_dir = r"c:\Users\muneb\Downloads\Alpha-funding\Alpha-main\src\app"

# Sector Pages
walk_and_replace(os.path.join(base_dir, "sectors"), 'bg-[#fafafa]', 'bg-bg-subtle')

# Solution Pages
walk_and_replace(os.path.join(base_dir, "solutions"), 'bg-[#f0f0f0]', 'bg-light-gray')
