export default function IconButton({ iconSrc, kind = "cat", label, onClick }) {
  const icon = kind === "cat" ? "猫" : kind === "music" ? "♪" : "册";

  return (
    <button className={`icon-button ${kind}`} type="button" onClick={onClick}>
      <span className="icon-mark" aria-hidden="true">
        {iconSrc ? <img src={iconSrc} alt="" /> : icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
