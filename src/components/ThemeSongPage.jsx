import { MUSIC_FRAGMENT_IDS, points } from "../data/points.js";
import { getThemePlaybackMessage } from "../services/audioPlayer.js";

export default function ThemeSongPage({ onOpenAtlas, onOpenPoint, unlockedFragments }) {
  const unlockedCount = MUSIC_FRAGMENT_IDS.filter((fragmentId) =>
    unlockedFragments.includes(fragmentId)
  ).length;
  const isUnlocked = unlockedCount >= MUSIC_FRAGMENT_IDS.length;
  const fullThemeAudioSrc = points[0]?.fullThemeAudioSrc || "/audio/full-theme.mp3";

  return (
    <section className="page-v03 theme-screen">
      <button className="back-button" type="button" onClick={onOpenPoint}>
        ← 返回点位
      </button>
      <div className="theme-card">
        <div className="record-disc" />
        <p className="eyebrow">完整主题曲</p>
        <h1>{isUnlocked ? "PawPal 高桥慢游主题曲已解锁" : "主题曲还在路上"}</h1>
        <p>
          {isUnlocked
            ? "五个音乐碎片已经拼在一起。第一版先用文字模拟播放，后续可接入完整 mp3。"
            : `已收集 ${unlockedCount} / ${MUSIC_FRAGMENT_IDS.length} 个音乐碎片，继续去不同点位打开音乐图鉴。`}
        </p>
        <div className="theme-player">
          {isUnlocked ? getThemePlaybackMessage(fullThemeAudioSrc) : "完整主题曲尚未解锁"}
        </div>
        <button className="primary-button" type="button" onClick={onOpenAtlas}>
          返回音乐图鉴
        </button>
      </div>
    </section>
  );
}
