import React from "react";
import Color from "color";
import Draggable from "react-draggable";
import QRCode from "react-qr-code";

const CertificatePreview = ({
  name,
  color,
  font,
  fontSize,
  fontWeight,
  fontStyle,
  textDecoration,
  position,
  qr,
  qrPosition,
  qrSize,
  template,
  customImage,
  customImagePosition,
  customImageSize,
  innerRef,
  handleStop,
}) => {
  const convertedColor = Color(color).hex();

  return (
    <div className="relative w-full h-auto p-4" ref={innerRef}>
      <img src={template} alt="template" className="w-full h-auto" />

      <Draggable
        position={position}
        onStop={(e, data) => handleStop("name", data)}
        bounds="parent"
        defaultClassName="no-border"
      >
        <h1
          className="absolute cursor-move whitespace-nowrap top-0"
          style={{
            color: convertedColor,
            fontFamily: font,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            textDecoration: textDecoration,
            outline: "none",
            boxShadow: "none",
          }}
        >
          {name || "Sample Name"}
        </h1>
      </Draggable>

      {qr && (
        <Draggable
          position={qrPosition}
          onStop={(e, data) => handleStop("qr", data)}
          bounds="parent"
        >
          <div className="absolute cursor-move top-0">
            <QRCode value={qr} size={qrSize} />
          </div>
        </Draggable>
      )}

      {customImage && (
        <Draggable
          position={customImagePosition}
          onStop={(e, data) => handleStop("customImage", data)}
          bounds="parent"
          defaultClassName="draggable-image"
        >
          <div
            className="absolute cursor-move top-0"
            style={{
              width: `${customImageSize}px`,
              height: "auto",
              zIndex: 10,
            }}
          >
            <img
              src={customImage}
              alt="Custom"
              className="w-full h-auto"
              draggable="false"
            />
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default CertificatePreview;
