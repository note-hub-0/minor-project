import React, { useState } from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { uploadNotes } from "../../api/notesApi";
import ProgressLoader from "../Loader/ProgressLoader";

export default function UploadNotes() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Class: "",
    subject: "",
    isPremium: false,
    price: "",
    thumbnail: null,
    notesFile: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePremium = () => {
    setFormData((prev) => ({
      ...prev,
      isPremium: !prev.isPremium,
      price: "",
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (value !== null) {
        data.append(key === "notesFile" ? "note" : key, value);
      }
    }

    try {
      const res = await uploadNotes(data, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      if (res.status === 200) {
        setUploadProgress(100);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`container py-5 ${isDark ? "bg-dark text-light" : ""}`}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className={`card shadow-sm border-0 ${
              isDark ? "bg-secondary text-light" : ""
            }`}
          >
            <div
              className={`card-header text-center ${
                isDark ? "bg-dark text-light" : "bg-primary text-white"
              }`}
            >
              <h4 className="mb-0">📄 Upload Notes</h4>
            </div>

            {isUploading ? (
              <ProgressLoader
                progress={uploadProgress}
                filename={formData.notesFile?.name || "file"}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-body"
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={2}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short description"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Class / Semester
                  </label>
                  <input
                    type="text"
                    name="Class"
                    className="form-control"
                    value={formData.Class}
                    onChange={handleChange}
                    placeholder="e.g., 3rd Sem"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Web Technology"
                    required
                  />
                </div>

                <div className="mb-3 d-flex align-items-center gap-3">
                  <label className="form-label fw-semibold mb-0">
                    Is Premium?
                  </label>
                  <div className="form-check form-switch m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.isPremium}
                      onChange={handleTogglePremium}
                    />
                  </div>
                </div>

                {formData.isPremium && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Price</label>
                    <select
                      className="form-select"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Price In Points</option>
                      <option value="10">5</option>
                      <option value="20">10</option>
                      <option value="30">15</option>
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Thumbnail</label>
                  <input
                    type="file"
                    name="thumbnail"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Upload Notes (PDF/DOC)
                  </label>
                  <div
                    className={`border border-2 border-dashed p-4 rounded text-center ${
                      isDark ? "bg-dark text-light" : "bg-light"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <label htmlFor="notesFile" className="d-block">
                      {formData.notesFile ? (
                        <>
                          <div className="fs-5 fw-semibold text-success">
                            ✅ {formData.notesFile.name} uploaded
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="fs-4 mb-2">📤 Click to upload</div>
                          <div className="text-muted">
                            Supported: .pdf, .doc, .docx
                          </div>
                        </>
                      )}
                      <input
                        type="file"
                        id="notesFile"
                        name="notesFile"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-primary w-100 fw-bold"
                    type="submit"
                  >
                    🚀 Upload Note
                  </button>
                </div>
              </form>
            )}

            <div
              className={`card-footer text-center small ${
                isDark ? "text-light" : "text-muted"
              }`}
            >
              Make sure your note is well-formatted and helpful!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
