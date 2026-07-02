import { useState } from "react";
import { MUSIC_FRAGMENT_IDS } from "../data/points.js";

export default function AtlasPage({
  currentPointId,
  onOpenEntry,
  onOpenPoint,
  onOpenThemeSong,
  points,
  unlockedFragments,
  unlockedPoints
}) {
  const [activeTab, setActiveTab] = useState("paw");
  const litCount = points.filter((point) => unlockedPoints.includes(point.id)).length;
  const currentPoint = points.find((point) => point.id === currentPointId) || points[0];
  const completeMusicUnlocked = MUSIC_FRAGMENT_IDS.every((fragmentId) =>
    unlockedFragments.includes(fragmentId)
  );

  return (
    <section className="screen atlas-screen">
      <div className="top-bar">
        <button className="ghost-button" type="button" onClick={() => onOpenPoint(currentPoint.id)}>
          返回当前点位
        </button>
        <button className="ghost-button" type="button" onClick={onOpenEntry}>
          探索其他点位
        </button>
      </div>

      <header className="atlas-header">
        <p className="eyebrow">高桥宠物友好村</p>
        <h1>PawPal 图鉴</h1>
        <p>猫爪已点亮 {litCount} / {points.length}，音乐碎片 {unlockedFragments.length} / 5</p>
      </header>

      <div className="atlas-tabs" role="tablist" aria-label="图鉴类型">
        <button
          className={activeTab === "paw" ? "tab-button active" : "tab-button"}
          type="button"
          onClick={() => setActiveTab("paw")}
        >
          宠物图鉴
        </button>
        <button
          className={activeTab === "music" ? "tab-button active" : "tab-button"}
          type="button"
          onClick={() => setActiveTab("music")}
        >
          音乐图鉴
        </button>
      </div>

      {activeTab === "paw" && (
        <div className="atlas-grid">
          {points.map((point) => {
            const unlocked = unlockedPoints.includes(point.id);
            return (
              <article className={unlocked ? "atlas-item lit" : "atlas-item locked"} key={point.id}>
                <div className="atlas-paw" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <p className="card-kicker">{point.type}</p>
                  <h2>{point.name}</h2>
                  {unlocked ? <strong>{point.badge}</strong> : null}
                  <p>{unlocked ? "已点亮" : "等待你去现场碰一碰 NFC 解锁"}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {activeTab === "music" && (
        <section className="music-atlas-card">
          <h2>主题曲碎片</h2>
          <p>去不同点位点击「听听这里」，收集 5 个声音碎片。</p>
          <div className="fragment-grid">
            {MUSIC_FRAGMENT_IDS.map((fragmentId, index) => {
              const unlocked = unlockedFragments.includes(fragmentId);
              return (
                <div className={unlocked ? "fragment-slot unlocked" : "fragment-slot"} key={fragmentId}>
                  <span className="music-disc" aria-hidden="true" />
                  <strong>碎片 {index + 1}</strong>
                  <small>{unlocked ? "已收集" : "待解锁"}</small>
                </div>
              );
            })}
          </div>
          <button
            className="primary-button full-button"
            disabled={!completeMusicUnlocked}
            type="button"
            onClick={onOpenThemeSong}
          >
            {completeMusicUnlocked ? "播放完整主题曲" : "集齐 5 个碎片后解锁"}
          </button>
        </section>
      )}
    </section>
  );
}
