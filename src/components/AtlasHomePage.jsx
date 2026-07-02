import IconButton from "./IconButton.jsx";

export default function AtlasHomePage({ onBack, onOpenCatAtlas, onOpenMusicAtlas }) {
  return (
    <section className="page-v03 atlas-home">
      <button className="back-button" type="button" onClick={onBack}>← 返回</button>
      <header>
        <p>收藏入口</p>
        <h1>PawPal 图鉴册</h1>
      </header>
      <div className="atlas-home-actions">
        <IconButton
          iconSrc="/icons/bottom-nav/atlas-pet-icon.png"
          kind="cat"
          label="宠物图鉴"
          onClick={onOpenCatAtlas}
        />
        <IconButton
          iconSrc="/icons/bottom-nav/atlas-music-icon.png"
          kind="music"
          label="音乐图鉴"
          onClick={onOpenMusicAtlas}
        />
      </div>
    </section>
  );
}
