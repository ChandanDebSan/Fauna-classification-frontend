import { useState } from "react";
import axios from "axios";
import ConfidenceMeter from "./confidence_meter";
import chandanImg from "./assets/team/chandan.jpg";
import anshImg from "./assets/team/ansh.jpg";
import utkarshImg from "./assets/team/utkarsh.jpg";
import sirImg from "./assets/team/sirImg.png";
// Options for each category
const MODEL_OPTIONS = {
  species: [
    "ViT Transformer",
    "Dino V2 Base",
    "Swin Base Transformer",
    "Swin Small Transformer",
  ],
  conservation: [
    "ViT Transformer",
    "DenseNet",
    "Swin Base Transformer",
    "ResNet50",
    "EfficientNetV2",
  ],
  type: [
    "VIT Transformer",
    "EfficientNetV2-B3",
    "EfficientNetV2-B1",
    "DenseNet",
    "ResNet50",
  ],
};

// --- NEW: Team Data ---
const CONTRIBUTORS = [
  {
    name: "Chandan Deb",
    role: "Full Stack & Conservation Classifier",
    image: chandanImg,
    linkedin: "https://www.linkedin.com/in/chandan-deb-a24a8126a/", // Replace with actual LinkedIn URL
    tasks: [
      "Trained Conservation Models",
      "Built Backend API",
      "Built Frontend UI",
    ],
  },
  {
    name: "Ansh Goel",
    role: "Species Classifier",
    image: anshImg,
    linkedin: "https://www.linkedin.com/in/ansh-goel-9a0a992b9/", // Replace with actual LinkedIn URL
    tasks: ["Trained Species Models", "Built Dataset"],
  },
  {
    name: "Utkarsh Singh",
    role: "Mammal Type Classifier",
    image: utkarshImg,
    linkedin: "https://www.linkedin.com/in/ut-singh/", // Replace with actual LinkedIn URL
    tasks: ["Trained Mammal Classifiers", "Built Dataset"],
  },
  {
    name: "Dr Rahul Sharma",
    role: "Mentor and Project Guide",
    image: sirImg,
    linkedin: "https://www.linkedin.com/in/rahulsharma2612/", // Replace with actual LinkedIn URL
    tasks: ["Academic Mentor", "B.Tech Project Supervisor"],
  },
];

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [selectedModels, setSelectedModels] = useState({
    species: MODEL_OPTIONS.species[0],
    conservation: MODEL_OPTIONS.conservation[0],
    type: MODEL_OPTIONS.type[0],
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModelChange = (category, value) => {
    setSelectedModels((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResults(null);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload an image before analyzing.");
      return;
    }

    setLoading(true);
    setResults(null);
    setError(""); // Clear any previous errors

    const formData = new FormData();
    formData.append("file", file);
    formData.append("species_model", selectedModels.species);
    formData.append("conservation_model", selectedModels.conservation);
    formData.append("type_model", selectedModels.type);

    try {
      const response = await axios.post(
        "https://chandandebsan-fauna-classification-redo.hf.space/predict_all",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Prediction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // All the Styles
  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#333",
  };
  const headerStyle = {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "2.5rem",
    color: "#2d3748",
  };
  // Main split layout
  const layoutStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    alignItems: "flex-start",
  };
  const columnStyle = { flex: "1", minWidth: "300px" };

  // Common card styling
  const cardStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  };
  const imageStyle = {
    width: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    backgroundColor: loading ? "#93c5fd" : "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "background-color 0.2s",
  };

  const errorStyle = {
    color: "#ef4444",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "600",
  };
  //  Styles for Team Section
  const teamSectionStyle = {
    marginTop: "80px",
    paddingTop: "40px",
    borderTop: "1px solid #e2e8f0",
  };
  const teamGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  };
  const teamCardStyle = {
    ...cardStyle,
    textAlign: "center",
    padding: "30px 20px",
    height: "300px",
  };
  const avatarStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "4px solid #e1f5f9",
  };
  const roleStyle = {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "0.9rem",
    marginBottom: "15px",
    display: "block",
  };
  const tagStyle = {
    display: "inline-block",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    margin: "3px",
  };

  // Helper to render a result card
  const renderResultCard = (category, data) => {
    if (!data) return null;
    return (
      <div
        key={category}
        style={{
          ...cardStyle,
          borderLeft: "5px solid #22c55e",
          marginBottom: "20px",
        }}
      >
        <h4
          style={{
            marginTop: 0,
            textTransform: "capitalize",
            color: "#64748b",
            fontSize: "0.85rem",
            letterSpacing: "1px",
          }}
        >
          {category} Analysis
        </h4>
        <h2 style={{ marginTop: "5px", color: "#1e293b", fontSize: "1.5rem" }}>
          {data.class_name}
        </h2>

        <ConfidenceMeter score={data.confidence} />

        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Using: <strong>{selectedModels[category]}</strong>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Fauna Classifier </h1>

      {/*  MAIN SPLIT SECTION  */}
      <div style={layoutStyle}>
        {/* LEFT: Image Upload */}
        <div style={columnStyle}>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>1. Upload Image</h3>
            <div
              style={{
                marginBottom: "20px",
                border: "2px dashed #cbd5e1",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8fafc",
              }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                id="file-upload"
                style={{ display: "none" }}
              />
              <label
                htmlFor="file-upload"
                style={{
                  cursor: "pointer",
                  color: "#2563eb",
                  fontWeight: "600",
                }}
              >
                {file ? "Change Image" : "Click to Select Image"}
              </label>
              {file && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "0.8rem",
                    color: "#64748b",
                  }}
                >
                  {file.name}
                </div>
              )}
            </div>
            {preview ? (
              <img src={preview} alt="Preview" style={imageStyle} />
            ) : (
              <div
                style={{
                  ...imageStyle,
                  height: "200px",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                No Image Selected
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Configuration & Results Cards */}
        <div style={columnStyle}>
          {/* Configuration Panel */}
          <div style={{ ...cardStyle, marginBottom: "20px" }}>
            <h3 style={{ marginTop: 0 }}>2. Model Configuration</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {Object.keys(MODEL_OPTIONS).map((category) => (
                <div key={category}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {category} Model
                  </label>
                  <select
                    value={selectedModels[category]}
                    onChange={(e) =>
                      handleModelChange(category, e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    {MODEL_OPTIONS[category].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Running 3x Analysis..." : "Analyze All"}
            </button>
            {error && <div style={errorStyle}>{error}</div>}
          </div>

          {/* Results Cards */}
          {results && (
            <div>
              <h3 style={{ color: "#334155", marginBottom: "15px" }}>
                Analysis Results
              </h3>
              {renderResultCard("species", results.species)}
              {renderResultCard("conservation", results.conservation)}
              {renderResultCard("type", results.type)}
            </div>
          )}
        </div>
      </div>

      {/*WikiPedia Summary */}

      {results && results.species && results.species.description && (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <div
            style={{
              ...cardStyle,
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#334155" }}>
              Wikipedia Summary:{" "}
              <span style={{ color: "#2563eb" }}>
                {results.species.class_name}
              </span>
            </h2>
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <p
                style={{
                  lineHeight: "1.7",
                  color: "#475569",
                  fontSize: "1.05rem",
                }}
              >
                {results.species.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contributors Section*/}
      <div style={teamSectionStyle}>
        <h2
          style={{
            textAlign: "center",
            color: "#334155",
            marginBottom: "10px",
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#334155",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          The machine learning engineers and developers behind the Fauna
          Classifier.
        </p>

        <div style={teamGridStyle}>
          {CONTRIBUTORS.map((person, index) => (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-member-link"
              style={{
                color: "#1e293b",
                textDecoration: "none",
                transition: "color 0.3s ease, transform 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#2563eb";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#1e293b";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div key={index} style={teamCardStyle}>
                <img src={person.image} alt={person.name} style={avatarStyle} />
                <h3 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>
                  {person.name}
                </h3>
                <span style={roleStyle}>{person.role}</span>

                <div style={{ marginTop: "10px" }}>
                  {person.tasks.map((task, i) => (
                    <span key={i} style={tagStyle}>
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;