import IconButton from "./IconButton.jsx";
import PawPalCat from "./PawPalCat.jsx";

export default function MainInteractionScreen({
  isCatMoved,
  onCatClick,
  onOpenAtlasHome,
  onOpenCatModal,
  onOpenMusicModal,
  point
}) {
  return (
    <section className="interaction-v03">
      <div className="interaction-stage">
        <div className={isCatMoved ? "activity-tip shown" : "activity-tip"}>
          {point.activityText}
        </div>
        <PawPalCat
          className={isCatMoved ? "comic-cat moved" : "comic-cat"}
          point={point}
          type="comic"
          onClick={onCatClick}
        />
      </div>

      <div className="interaction-label">
        <p>{point.pointType}</p>
        <h2>{point.pointName}</h2>
      </div>

      <nav className="bottom-actions" aria-label="点位互动">
        <IconButton kind="cat" label="猫咪" onClick={onOpenCatModal} />
        <IconButton kind="atlas" label="图鉴" onClick={onOpenAtlasHome} />
        <IconButton kind="music" label="音乐" onClick={onOpenMusicModal} />
      </nav>
    </section>
  );
}
