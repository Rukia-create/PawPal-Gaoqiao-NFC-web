import Modal from "./Modal.jsx";

export default function CurrentMusicModal({
  onClose,
  playbackMessage,
  point
}) {
  const fragmentId = point.fragmentId || 0;
  const fragmentTitle = `高桥宠物友好村主题曲片段${fragmentId}`;

  return (
    <Modal title="音乐图鉴" onClose={onClose}>
      <div className="modal-main music-profile">
        <div className="record-disc" />
        <div className="music-fragment-message">
          <span className="music-fragment-message__intro">恭喜你！收集到了</span>
          <strong>{fragmentTitle}</strong>
          <span className="music-fragment-message__hint">集齐8个片段可以解锁完整版的主题曲哦！</span>
        </div>
        {playbackMessage ? <p className="music-fragment-audio-note">{playbackMessage}</p> : null}
        {point.audioSrc ? (
          <audio className="music-fragment-audio" src={point.audioSrc} controls>
            你的浏览器暂不支持音频播放。
          </audio>
        ) : (
          <p className="music-fragment-audio-note">这个片段的音频文件待补充。</p>
        )}
      </div>
    </Modal>
  );
}
