import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageUploader = ({ selectedImage, handleImageUpload }: any) => {
    return (
        <div>
            <input type="file" accept="application/pdf, image/*" onChange={handleImageUpload} />
            {selectedImage && <img src={selectedImage} alt="Selected" />}
        </div>
    );
};
export default ImageUploader;