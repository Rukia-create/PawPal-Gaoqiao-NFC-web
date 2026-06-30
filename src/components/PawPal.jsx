import { useState } from "react";

export default function PawPal({ size = "default" }) {
  const [imageAvailable, setImageAvailable] = useState(true);
  const className = size === "compact" ? "pawpal-image compact" : "pawpal-image";

  if (imageAvailable) {
    return (
      <img
        className={className}
        src="/pawpal/pawpal-placeholder.png"
        alt="PawPal"
        onError={() => setImageAvailable(false)}
      />
    );
  }

  return (
    <div className={size === "compact" ? "pawpal compact" : "pawpal"} aria-label="PawPal 占位形象">
      <div className="pawpal-ear pawpal-ear-left" />
      <div className="pawpal-ear pawpal-ear-right" />
      <div className="pawpal-face">
        <span className="pawpal-eye" />
        <span className="pawpal-eye" />
      </div>
    </div>
  );
}
