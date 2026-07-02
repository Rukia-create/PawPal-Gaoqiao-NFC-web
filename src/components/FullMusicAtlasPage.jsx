import { useState } from "react";
import { MUSIC_FRAGMENT_IDS } from "../data/points.js";
import { playPointAudio, stopPointAudio } from "../services/audioPlayer.js";

function formatFragmentId(fragmentId) {
  return String(fragmentId).padStart(2, "0");
}

export default function FullMusicAtlasPage({
  collectedMusicFragments,
  onBack,
  onOpenThemeSong,
  points,
  themeUnlocked
}) {
  const [playingFragmentId, setPlayingFragmentId] = useState(null);
  const fragmentPoints = MUSIC_FRAGMENT_IDS.map((fragmentId) =>
    points.find((point) => point.fragmentId === fragmentId)
  );

  async function toggleFragment(point, fragmentId) {
    if (playingFragmentId === fragmentId) {
      stopPointAudio();
      setPlayingFragmentId(null);
      return;
    }

    if (playingFragmentId || !point?.audioSrc) return;

    const result = await playPointAudio(point, {
      onEnded: () => setPlayingFragmentId(null)
    });
    if (result.status === "playing") {
      setPlayingFragmentId(fragmentId);
    }
  }

  function handleBack() {
    stopPointAudio();
    setPlayingFragmentId(null);
    onBack();
  }

  function handleOpenThemeSong() {
    stopPointAudio();
    setPlayingFragmentId(null);
    onOpenThemeSong();
  }

  return (
    <section className="page-v03 full-atlas">
      <button className="back-button" type="button" onClick={handleBack}>← 返回</button>
      <header>
        <p>音乐碎片 {collectedMusicFragments.length} / {MUSIC_FRAGMENT_IDS.length}</p>
        <h1>音乐图鉴</h1>
      </header>

      <div className="collection-grid music-collection-grid">
        {fragmentPoints.map((point, index) => {
          const fragmentId = index + 1;
          const collected = collectedMusicFragments.includes(fragmentId);
          const isPlaying = playingFragmentId === fragmentId;
          const disabled = !collected || !point?.audioSrc || Boolean(playingFragmentId && !isPlaying);

          return (
            <button
              className={[
                "collection-card",
                "music",
                collected ? "collected" : "uncollected",
                isPlaying ? "playing" : "",
                disabled ? "disabled" : ""
              ].filter(Boolean).join(" ")}
              disabled={disabled}
              key={fragmentId}
              type="button"
              onClick={() => toggleFragment(point, fragmentId)}
            >
              <div className="record-disc" />
              <h2>{collected ? `主题曲片段 ${formatFragmentId(fragmentId)}` : "未收集"}</h2>
              <p>{collected ? point?.pointName : "去对应点位打开歌曲卡解锁"}</p>
              <small>{collected ? (isPlaying ? "再次点击暂停" : "点击播放") : `片段 ${formatFragmentId(fragmentId)}`}</small>
            </button>
          );
        })}
      </div>

      <article className={themeUnlocked ? "theme-unlocked-card unlocked" : "theme-unlocked-card"}>
        <h2>{themeUnlocked ? "完整主题曲已解锁" : "完整主题曲未解锁"}</h2>
        <p>
          {themeUnlocked
            ? `${MUSIC_FRAGMENT_IDS.length} 个片段已经集齐，可以播放完整主题曲。`
            : `集齐 ${MUSIC_FRAGMENT_IDS.length} 个片段后解锁完整主题曲。`}
        </p>
        <button
          className="primary-button"
          type="button"
          disabled={!themeUnlocked}
          onClick={handleOpenThemeSong}
        >
          播放完整主题曲
        </button>
      </article>
    </section>
  );
}
