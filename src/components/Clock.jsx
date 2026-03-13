export default function Clock({
  time,
  isActive,
  width = 120,
  height = 80,
  top,
  left,
  right,
  bottom
}) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        top,
        left,
        right,
        bottom,
        background: isActive ? "#8b5a2b" : "#6b4e30",
        border: isActive ? "3px solid #ffd700" : "3px solid transparent",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "26px",
        fontWeight: "bold",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)"
      }}
    >
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}