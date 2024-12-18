import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Draggable from "react-draggable";
import domtoimage from "dom-to-image-more";
import Color from "color";
import CertificatePreview from "./CertificatePreview";

const CertificateGenerate = () => {
  const [names, setNames] = useState("");
  const [generatedNames, setGeneratedNames] = useState(["Sample Name"]);
  const [template, setTemplate] = useState(null);
  const [position, setPosition] = useState({ x: 140, y: 140 });
  const [qrPosition, setQrPosition] = useState({ x: 200, y: 200 });
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(48);
  const [qrSize, setQrSize] = useState(100);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textDecoration, setTextDecoration] = useState("none");
  const [customImage, setCustomImage] = useState(null);
  const [customImagePosition, setCustomImagePosition] = useState({
    x: 100,
    y: 100,
  });
  const [customImageSize, setCustomImageSize] = useState(100);
  const componentRefs = useRef([]);
  const [input, setInput] = useState("");
  const [qrCode, setQrcode] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRefs.current[0],
  });

  const handleDownloadAll = async () => {
    for (let i = 0; i < componentRefs.current.length; i++) {
      const ref = componentRefs.current[i];

      if (ref) {
        try {
          const dataUrl = await domtoimage.toPng(ref);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `certificate-${i + 1}.png`;
          link.click();
        } catch (error) {
          console.error("Error capturing certificate:", error);
        }
      }
    }
  };

  function handleUploadTemplate(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTemplate(reader.result);
      setShowInstructions(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleUploadCustomImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCustomImage(reader.result);
      // Reset position when new image is uploaded
      setCustomImagePosition({ x: 100, y: 100 });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleStop(type, data) {
    const newPosition = { x: data.x, y: data.y };

    switch (type) {
      case "name":
        setPosition(newPosition);
        break;
      case "qr":
        setQrPosition(newPosition);
        break;
      case "customImage":
        setCustomImagePosition(newPosition);
        break;
      default:
        break;
    }
  }

  function handleGenerateQrCode() {
    setQrcode(input);
  }

  function handleGenerateCertificates() {
    const nameList = names.split(",").map((name) => name.trim());
    setGeneratedNames(nameList);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-black via-gray-950 to-blue-950">
      <div className="flex-1 p-6">
        {!template ? (
          <div className="bg-gray-950 border border-gray-700 p-6 rounded-lg text-gray-100 shadow-lg">
            <h2 className="text-2xl lg:text-4xl font-bold mb-8 text-blue-400">
              How to Use the Certificate Generator
            </h2>
            <ol className="list-decimal list-inside space-y-2 lg:space-y-4 lg:text-lg">
              <li>
                <span className="font-semibold">Upload</span> a template image
                for your certificate.
              </li>
              <li>
                <span className="font-semibold">Enter names</span> separated by
                commas.
              </li>
              <li>
                <span className="font-semibold">Click "Generate"</span> to
                create your certificates.
              </li>
              <li>
                <span className="font-semibold">
                  Enter QR code data (if any ){" "}
                </span>{" "}
                if needed.
              </li>
              <li>
                <span className="font-semibold">Customize</span> the font,
                color, and position for the name and QR code.
              </li>
              <li>
                <span className="font-semibold">Preview and download</span> all
                generated certificates as PNG files.
              </li>
            </ol>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {generatedNames.map((name, index) => (
              <div
                key={index}
                className="relative shadow-lg rounded-lg overflow-hidden"
              >
                <CertificatePreview
                  innerRef={(el) => (componentRefs.current[index] = el)}
                  name={name}
                  template={template}
                  position={position}
                  qrPosition={qrPosition}
                  handleStop={handleStop}
                  color={color}
                  font={font}
                  fontSize={fontSize}
                  qrSize={qrSize}
                  fontWeight={fontWeight}
                  fontStyle={fontStyle}
                  textDecoration={textDecoration}
                  qr={qrCode}
                  customImage={customImage}
                  customImagePosition={customImagePosition}
                  customImageSize={customImageSize}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-1/4 bg-black lg:border-l border-gray-700 p-6 shadow-md md:ml-4 lg:h-screen lg:overflow-scroll">
        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Upload Template
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadTemplate}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Enter Names (separated by commas)
          </label>
          <textarea
            rows="4"
            onChange={(e) => setNames(e.target.value)}
            placeholder="Enter names, e.g. Alex Stark, Jhon Doe, ..."
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Generate Certificates
          </label>
          <button
            onClick={handleGenerateCertificates}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Generate
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Enter QR Code Data
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          />
          <button
            onClick={handleGenerateQrCode}
            className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Generate QR Code
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Font Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 bg-gray-700 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Font Family
          </label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
            <option value="Raleway">Raleway</option>
            <option value="Playfair Display">Playfair Display</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Nunito">Nunito</option>
            <option value="Ubuntu">Ubuntu</option>
            <option value="Oswald">Oswald</option>
            <option value="Dancing Script">Dancing Script</option>
            <option value="Pacifico">Pacifico</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Font Size
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Upload Custom Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadCustomImage}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {customImage && (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold mb-2">
                Custom Image Size
              </label>
              <input
                type="number"
                value={customImageSize}
                onChange={(e) => setCustomImageSize(Number(e.target.value))}
                className="w-full bg-gray-700 text-white p-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <button
                onClick={() => setCustomImage(null)}
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Remove Custom Image
              </button>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            QR Code Size
          </label>
          <input
            type="number"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Font Weight
          </label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Font Style
          </label>
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 font-semibold mb-2">
            Text Decoration
          </label>
          <select
            value={textDecoration}
            onChange={(e) => setTextDecoration(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="line-through">Line-through</option>
          </select>
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={handleDownloadAll}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Download All as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerate;
