import PawPal from "./PawPal.jsx";
import CompletionModal from "./CompletionModal.jsx";
import ThemeUnlockModal from "./ThemeUnlockModal.jsx";

function ChecklistItem({ done, children }) {
  return (
    <li className={done ? "check-item done" : "check-item"}>
      <span className="check-box" aria-hidden="true">
        {done ? "✓" : ""}
      </span>
      {children}
    </li>
  );
}

export default function PointPage({
  feedbackMessage,
  hasListened,
  hasPatted,
  musicMessage,
  onCloseModal,
  onCloseThemeUnlock,
  onListen,
  onOpenAtlas,
  onOpenEntry,
  onOpenThemeSong,
  onPat,
  point,
  showCompleteModal,
  showThemeUnlock
}) {
  return (
    <section className="h5-page point-h5">
      <section className="welcome-screen">
        <div className="nav-pill">PawPal NFC H5</div>
        <div className="hero-illustration">
          <PawPal />
          <span className="paint-orbit" />
        </div>
        <p className="eyebrow">你遇见了 {point.catName}</p>
        <h1>欢迎来到高桥宠物友好村</h1>
        <p className="lead">{point.pawpalPrompt}</p>
        <div className="scroll-cue">下滑继续探索</div>
      </section>

      <section className="interaction-screen">
        <div className="top-bar sticky-actions">
          <button className="ghost-button" type="button" onClick={onOpenEntry}>
            点位入口
          </button>
          <button className="ghost-button" type="button" onClick={onOpenAtlas}>
            我的图鉴
          </button>
        </div>

        <article className="point-info-card">
          <p className="card-kicker">{point.type}</p>
          <h2>{point.introTitle}</h2>
          <h3>{point.name}</h3>
          <p>{point.introText}</p>
          <div className="tag-list">
            {point.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="info-grid">
            <div>
              <span>推荐停留</span>
              <strong>{point.duration}</strong>
            </div>
            <div>
              <span>注意事项</span>
              <strong>{point.note}</strong>
            </div>
          </div>
        </article>

        <div className="pawpal-feedback-card">
          <PawPal size="compact" />
          <div className="speech-bubble">{feedbackMessage}</div>
        </div>

        <section className="task-card">
          <p className="eyebrow">互动任务</p>
          <h2>完成两个动作，点亮这个地点的猫爪。</h2>
          <ul className="check-list">
            <ChecklistItem done={hasListened}>听听这里</ChecklistItem>
            <ChecklistItem done={hasPatted}>摸摸 PawPal</ChecklistItem>
          </ul>
          {musicMessage ? <p className="music-progress-note">{musicMessage}</p> : null}
          <div className="main-button-stack">
            <button className="primary-button" type="button" onClick={onListen}>
              {hasListened ? `正在播放：${point.musicLabel}` : "听听这里"}
            </button>
            <button className="secondary-button" type="button" onClick={onPat}>
              {hasPatted ? "PawPal 被摸摸了" : "摸摸 PawPal"}
            </button>
            <button className="atlas-button" type="button" onClick={onOpenAtlas}>
              我的图鉴
            </button>
          </div>
        </section>
      </section>

      {showCompleteModal && (
        <CompletionModal onClose={onCloseModal} onOpenAtlas={onOpenAtlas} point={point} />
      )}

      {showThemeUnlock && (
        <ThemeUnlockModal onClose={onCloseThemeUnlock} onOpenThemeSong={onOpenThemeSong} />
      )}
    </section>
  );
}
