import React, { useState } from "react";

export default function PdfViewer({ pdfUrl }) {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: 15 }}>Modern PDF Viewer</h2>


      <div style={{ marginBottom: 10 }}>
        <button onClick={zoomOut} style={{ marginRight: 10 }}>
          ➖ Zoom Out
        </button>
        <button onClick={resetZoom} style={{ marginRight: 10 }}>
          🔄 Reset Zoom
        </button>
        <button onClick={zoomIn}>➕ Zoom In</button>
      </div>

      <div
        style={{
          width: "100%",
          height: "80vh",
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: 8,
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <embed
          src={pdfUrl}
          type="application/pdf"
          style={{
            width: `${100 * scale}%`,
            height: `${100 * scale}%`,
            display: "block",
            margin: "auto",
            transformOrigin: "top left",
            transition: "width 0.3s ease, height 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
