import PawPal from "./PawPal.jsx";

export default function SimulatedNfcEntry({ points, onOpenPoint }) {
  return (
    <section className="screen entry-screen">
      <div className="top-label">NFC-ready H5</div>
      <div className="entry-hero">
        <div>
          <p className="eyebrow">PawPal NFC 点位入口</p>
          <h1>选择一个点位，模拟手机碰一碰 NFC</h1>
          <p className="lead">
            第一版用 URL 参数模拟真实 NFC 标签打开页面后的结果。正式落地时，每个标签会写入对应点位 URL。
          </p>
        </div>
        <PawPal size="compact" />
      </div>

      <div className="point-card-list">
        {points.map((point) => (
          <article className="entry-card" key={point.id}>
            <div className="card-header">
              <div>
                <p className="card-kicker">{point.pointType}</p>
                <h2>{point.pointName}</h2>
              </div>
              <span className="mini-paw" aria-hidden="true" />
            </div>
            <p>{point.healingText}</p>
            <div className="tag-list">
              {point.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <button className="primary-button full-button" type="button" onClick={() => onOpenPoint(point.id)}>
              模拟碰一碰 NFC
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
