export default function CompletionModal({ onClose, onOpenAtlas, point }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="completion-modal" role="dialog" aria-modal="true" aria-labelledby="completion-title">
        <div className="modal-paw" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">猫爪已点亮</p>
        <h2 id="completion-title">完成任务！</h2>
        <p>你完成了 PawPal 的点位互动：听见这里的声音，也摸摸唤醒了 PawPal。</p>
        <div className="reward-box">
          <span>已解锁「高桥宠物友好村猫爪图鉴」</span>
          <strong>获得「{point.badge}」</strong>
        </div>
        <p className="speech-line">{point.feedback}</p>
        <div className="modal-actions">
          <button className="primary-button" type="button" onClick={onOpenAtlas}>
            查看我的图鉴
          </button>
          <button className="secondary-button" type="button" onClick={onClose}>
            继续停留
          </button>
        </div>
      </section>
    </div>
  );
}
