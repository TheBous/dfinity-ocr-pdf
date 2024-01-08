import React from "react";
import { createRoot } from "react-dom";

const App = () => {
  return (
    <div style={{ "fontSize": "30px" }}>
      PDF OCR App
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container); // React 18
root.render(<App />);