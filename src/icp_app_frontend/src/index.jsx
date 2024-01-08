import React, { useState } from "react";
import { createRoot } from "react-dom";
import PDFOcr from "./components/PDFOcr";
import ImageUploader from "./components/ImageUploader";


const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  return (
    <div style={{ "fontSize": "30px" }}>
      <ImageUploader handleImageUpload={handleImageUpload} selectedImage={selectedImage} />
      <PDFOcr selectedImage={selectedImage} />
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container); // React 18
root.render(<App />);