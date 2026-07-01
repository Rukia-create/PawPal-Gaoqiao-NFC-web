import PawPalCat from "./PawPalCat.jsx";

export default function WelcomeScreen({ point }) {
  const welcomeHello = point.welcomeHello || "Hi，你找到我啦！";
  const welcomeTitle = point.welcomeTitle || `我是 ${point.catName}`;
  const welcomeText = point.welcomeText || point.healingText;

  return (
    <section className={`welcome-v03 cat-island-welcome welcome-point-${point.id}`}>
      <div className="welcome-atmosphere" aria-hidden="true">
        <span className="deco leaf leaf-one" />
        <span className="deco leaf leaf-two" />
        <span className="deco paw-dot paw-one" />
        <span className="deco paw-dot paw-two" />
        <span className="deco note note-one">{"\u266A"}</span>
        <span className="deco map-pin" />
      </div>

      <div className="welcome-cat-zone">
        <PawPalCat className="real-cat-portrait hero-cutout-cat" point={point} type="real" />
      </div>

      <div className="welcome-copy">
        <p className="welcome-line hello">{welcomeHello}</p>
        <h1>{welcomeTitle}</h1>
        <p className="welcome-line healing">{welcomeText}</p>
      </div>

      <div className="pull-hint game-pull-hint">
        <span className="hint-text">{"\u4E0B\u62C9\u6536\u96C6\u70B9\u4F4D\u56FE\u9274"}</span>
        <span className="down-arrow" aria-hidden="true">{"\u2193"}</span>
      </div>
    </section>
  );
}
