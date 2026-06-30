import Modal from "./Modal.jsx";

export default function CurrentMusicModal({
  collectedMusicFragments,
  onClose,
  playbackMessage,
  point,
  themeUnlocked
}) {
  return (
    <Modal title="音乐图鉴" onClose={onClose}>
      <div className="modal-main music-profile">
        <div className="record-disc" />
        <h3>
          {point.musicType === "fragment"
            ? `正在播放：主题曲片段 ${point.fragmentId}`
            : `正在播放：${point.musicLabel}`}
        </h3>
        <p>{playbackMessage || point.musicDescription}</p>
        <p>{point.musicDescription}</p>
      </div>
      <div className="modal-progress">
        收集进度 {collectedMusicFragments.length} / 5
        {themeUnlocked ? " · 完整主题曲已解锁" : ""}
      </div>
    </Modal>
  );
}
