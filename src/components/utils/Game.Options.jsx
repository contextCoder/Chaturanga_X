import { useState } from "react";

export default function GameOptions({ onStart }) {
  const [customMinutes, setCustomMinutes] = useState("");

  const presets = [1, 2, 3, 4, 5];

  const startPresetGame = (minutes) => {
    onStart(minutes * 60);
  };

  const startCustomGame = () => {
    if (!customMinutes || customMinutes <= 0) return;

    onStart(Number(customMinutes) * 60);
  };

  return (
    <div
      style={{
        background: "#2b2b2b",
        padding: "25px",
        borderRadius: "10px",
        width: "320px",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>Select Game Time</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent:"center" }}>
        {presets.map((m) => (
          <button
            key={m}
            onClick={() => startPresetGame(m)}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {m} min
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Custom minutes"
          value={customMinutes}
          onChange={(e) => setCustomMinutes(e.target.value)}
          style={{
            padding: "8px",
            width: "120px",
            marginRight: "10px",
          }}
        />

        <button onClick={startCustomGame}>Start</button>
      </div>
    </div>
  );
}