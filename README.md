
<!-- Important Message -->
# I have saved an image in the Assets folder that contains the overview — you can use it if needed.

<!--  🧑‍💻 How to Use – Step by Step: -->

# 1. 🖼️ Load Image Automatically
First, the user searches or selects an image.
Then clicks the “Add Captions” button.
The selected image will automatically load onto the canvas.
After that, the user can begin editing the image.

# 2. ✍️ Add Text 
Click on the “Add Text” button.
An editable text field will appear on the canvas.
Use the “Text Color” picker to change the text color.

# 3. 🔷 Add Shapes
Use the Rectangle, Circle, Triangle, or Polygon buttons to add shapes to the canvas.
Use the “Shape Color” picker to change the shape's color.
All shapes are editable and resizable.

# 4. Layer Positioning (Z-Index)
By default, the image stays in the background.
Text and shapes appear on top of the image.
This is handled using the bringToFront() method.

#  5. 💾 Save Edited Image
Click the “Save” button to capture the current state of the canvas.
The saved image will be displayed in the preview section.

# 6. ⬇️ Download Final Image
Click the “Download” button to download the edited image in PNG format.

# 📌 Notes
The canvas size automatically adjusts based on the image dimensions.
All elements (image, text, shapes) are draggable and resizable.
The image loads only once — the overlapping issue has been fixed.