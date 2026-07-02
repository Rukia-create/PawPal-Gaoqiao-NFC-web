import PawPalCat from "./PawPalCat.jsx";

export default function FullCatAtlasPage({ collectedCats, onBack, points }) {
  return (
    <section className="page-v03 full-atlas">
      <button className="back-button" type="button" onClick={onBack}>← 返回</button>
      <header>
        <p>收集进度 {collectedCats.length} / {points.length}</p>
        <h1>宠物图鉴</h1>
      </header>
      <div className="collection-grid">
        {points.map((point) => {
          const collected = collectedCats.includes(point.id);
          return (
            <article className={collected ? "collection-card collected" : "collection-card locked"} key={point.id}>
              {collected ? <PawPalCat point={point} type="comic" /> : <div className="locked-cat">?</div>}
              <h2>{collected ? point.catName : "未发现"}</h2>
              <p>{collected ? point.pointName : "去现场碰一碰 NFC 解锁"}</p>
              {collected ? <small>{point.catPersonality}</small> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
