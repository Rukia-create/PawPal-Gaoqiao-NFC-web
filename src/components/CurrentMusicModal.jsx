import Modal from "./Modal.jsx";

function formatFragmentId(fragmentId) {
  return String(fragmentId).padStart(2, "0");
}

export default function CurrentMusicModal({
  onClose,
  playbackMessage,
  point
}) {
  const fragmentLabel = formatFragmentId(point.fragmentId);

  return (
    <Modal title="音乐图鉴" onClose={onClose}>
      <div className="modal-main music-profile">
        <div className="record-disc" />
        <div className="music-fragment-message">
          <strong>高桥宠物友好村主题曲片段 {fragmentLabel}</strong>
        </div>
        {point.audioSrc ? (
          <audio className="music-fragment-audio" src={point.audioSrc} controls>
            你的浏览器暂不支持音频播放。
          </audio>
        ) : (
          <p className="music-fragment-audio-note">这个片段的音频文件待补充。</p>
        )}
        {playbackMessage ? <p className="music-fragment-audio-note">{playbackMessage}</p> : null}
      </div>
    </Modal>
  );
}
