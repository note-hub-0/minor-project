import React from "react";

export default function ProgressLoader({ progress = 0, filename = "" }) {
  return (
    <div className="p-4 text-center">
      <h5 className="mb-3 text-primary">Uploading <span className="text-dark">{filename}</span></h5>

      <div className="progress" style={{ height: "25px" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
        >
          {progress < 100 ? `${progress}%` : "Done!"}
        </div>
      </div>

      <div className="mt-3 text-muted">
        {progress < 100 ? "Please wait..." : "Upload Complete ✅"}
      </div>
    </div>
  );
}
