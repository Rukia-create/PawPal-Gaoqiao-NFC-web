export default function ThemeUnlockModal({ onClose, onOpenThemeSong }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="completion-modal" role="dialog" aria-modal="true" aria-labelledby="theme-unlock-title">
        <div className="music-disc large" aria-hidden="true" />
        <p className="eyebrow">音乐图鉴完成</p>
        <h2 id="theme-unlock-title">完整主题曲已解锁！</h2>
        <p>五个点位的声音碎片已经集齐。PawPal 为你拼出了一首高桥慢游主题曲。</p>
        <div className="modal-actions">
          <button className="primary-button" type="button" onClick={onOpenThemeSong}>
            播放完整主题曲
          </button>
          <button className="secondary-button" type="button" onClick={onClose}>
            继续停留
          </button>
        </div>
      </section>
    </div>
  );
}
