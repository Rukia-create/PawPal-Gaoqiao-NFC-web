import { MUSIC_FRAGMENT_IDS } from "../data/points.js";

export default function FullMusicAtlasPage({
  collectedMusicFragments,
  onBack,
  onOpenThemeSong,
  points,
  themeUnlocked
}) {
  const fragmentPoints = MUSIC_FRAGMENT_IDS.map((fragmentId) =>
    points.find((point) => point.fragmentId === fragmentId)
  );

  return (
    <section className="page-v03 full-atlas">
      <button className="back-button" type="button" onClick={onBack}>← 返回</button>
      <header>
        <p>音乐碎片 {collectedMusicFragments.length} / 5</p>
        <h1>音乐图鉴</h1>
      </header>
      <div className="collection-grid">
        {fragmentPoints.map((point, index) => {
          const fragmentId = index + 1;
          const collected = collectedMusicFragments.includes(fragmentId);
          return (
            <article className={collected ? "collection-card music collected" : "collection-card music locked"} key={fragmentId}>
              <div className="record-disc" />
              <h2>{collected ? `主题曲碎片 ${fragmentId}` : "未发现"}</h2>
              <p>{collected ? point?.pointName : "去更多点位碰一碰 NFC 解锁"}</p>
              {collected ? <small>{point?.musicDescription}</small> : null}
            </article>
          );
        })}
      </div>
      <article className={themeUnlocked ? "theme-unlocked-card unlocked" : "theme-unlocked-card"}>
        <h2>{themeUnlocked ? "完整主题曲已解锁" : "完整主题曲未解锁"}</h2>
        <p>{themeUnlocked ? "五个碎片已经拼成 PawPal 的高桥慢游主题曲。" : "集齐 5 个碎片后解锁完整主题曲。"}</p>
        <button className="primary-button" type="button" disabled={!themeUnlocked} onClick={onOpenThemeSong}>
          播放完整主题曲
        </button>
      </article>
    </section>
  );
}
