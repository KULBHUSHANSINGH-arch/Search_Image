import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './ImageEditor.css';

const ImageEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [shapeColor, setShapeColor] = useState("#FF0000");
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: imageSize.width,
      height: imageSize.height,
      selection: true,
    });

    fabricCanvas.current = canvas;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const scaleX = imageSize.width / img.width;
      const scaleY = imageSize.height / img.height;

      const fabricImg = new fabric.Image(img, {
        left: 0,
        top: 0,
        scaleX,
        scaleY,
        selectable: true,
      });

      canvas.add(fabricImg);
      fabricImg.sendToBack();
      canvas.setActiveObject(fabricImg);
      canvas.renderAll();
      setImage(fabricImg);
    };

    img.src = imageUrl;

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, imageSize]);

  const addText = () => {
    const newText = new fabric.IText('Enter text', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: selectedColor,
    });
    fabricCanvas.current.add(newText);
    newText.bringToFront();
    setText(newText);
  };

  const changeTextColor = (color) => {
    if (text) {
      text.set({ fill: color });
      fabricCanvas.current.renderAll();
    }
  };

  const addShape = (shape) => {
    let shapeObj;
    const commonProps = {
      left: 100,
      top: 100,
      fill: shapeColor,
    };

    switch (shape) {
      case 'rectangle':
        shapeObj = new fabric.Rect({ ...commonProps, width: 100, height: 100 });
        break;
      case 'circle':
        shapeObj = new fabric.Circle({ ...commonProps, radius: 50 });
        break;
      case 'triangle':
        shapeObj = new fabric.Triangle({ ...commonProps, width: 100, height: 100 });
        break;
      case 'polygon':
        shapeObj = new fabric.Polygon([
          { x: 100, y: 100 },
          { x: 150, y: 50 },
          { x: 200, y: 100 },
          { x: 150, y: 150 },
        ], { fill: shapeColor });
        break;
      default:
        return;
    }

    fabricCanvas.current.add(shapeObj);
    shapeObj.bringToFront();
  };

  const saveImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({ format: 'png', quality: 1 });
    setPreviewUrl(dataURL);
  };

  const downloadPreviewImage = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = 'saved-image.png';
      link.click();
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      {/* Left Panel */}
      <div style={{ flex: 3, padding: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px', border: '2px solid #ccc', padding: '10px' }}>
          <button onClick={addText}>Add Text</button>
          <button onClick={() => addShape('rectangle')}>Rectangle</button>
          <button onClick={() => addShape('circle')}>Circle</button>
          <button onClick={() => addShape('triangle')}>Triangle</button>
          <button onClick={() => addShape('polygon')}>Polygon</button>

          <label>
            Text Color:
            <input type="color" value={selectedColor} onChange={(e) => {
              setSelectedColor(e.target.value);
              changeTextColor(e.target.value);
            }} />
          </label>

          <label>
            Shape Color:
            <input type="color" value={shapeColor} onChange={(e) => setShapeColor(e.target.value)} />
          </label>
          {/* Save Button moved here */}
          <button onClick={saveImage} className="save-btn">Save</button>

        </div>

        <div style={{ border: '2px solid #ccc', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '20px' }}>
        {/* See Caption */}
        <div style={{ padding: '10px' }}>
          <button style={{ width: '100%', padding: '10px' }}>See Caption </button>

          {/* Image Preview */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            {previewUrl ? (
              <>
                <div className="preview-image-wrapper">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                </div>
                {/* Download Button  */}
                <button onClick={downloadPreviewImage} className="download-btn">Download</button>
              </>
            ) : (
              <div className="preview-image-wrapper">Save the image first to see it here for downloading. </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
