import { useState } from "react";
import IconButton from "./IconButton.jsx";
import Modal from "./Modal.jsx";
import PawPalCat from "./PawPalCat.jsx";

const BOTTOM_ACTIONS = {
  atlas: {
    iconSrc: "/icons/bottom-nav/book-icon.png",
    label: "\u56FE\u9274"
  },
  cat: {
    iconSrc: "/icons/bottom-nav/paw-icon.png",
    label: "PawPal\u5361"
  },
  music: {
    iconSrc: "/icons/bottom-nav/music-icon.png",
    label: "\u6B4C\u66F2\u5361"
  }
};

const FLOWER_OPTIONS = Array.from({ length: 9 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    imageSrc: `/images/flowers/${id}.png`,
    label: `花 ${id}`
  };
});

const ORACLE_FORTUNES = [
  {
    title: "大吉",
    text: "今日宜撸猫，宜在阳光下打盹，宜被柔软的事物包围。"
  },
  {
    title: "吉",
    text: "转角或遇猫，遇事可从容。该来的总会来，不慌不忙就好。"
  },
  {
    title: "中吉",
    text: "无风无浪，有猫有闲。寻常日子，也是一种偏爱的安排。"
  }
];

const ISLAND_IDENTITIES = [
  "\u75AF\u72C2\u5438\u732B\u7684\u6253\u5DE5\u4EBA",
  "\u5E26\u795E\u517D\u4EBA\u7C7B\u5E7C\u5D3D\u7684\u5BB6\u957F",
  "\u5E26\u7740\u6C6A\u6C6A/\u55B5\u55B5\u7684\u8D44\u6DF1\u94F2\u5C4E\u5B98"
];

function downloadBlankFlowerCard() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1260" viewBox="0 0 900 1260">
    <rect width="900" height="1260" rx="44" fill="#fffaf0"/>
    <rect x="54" y="54" width="792" height="1152" rx="30" fill="none" stroke="#d8b879" stroke-width="6" stroke-dasharray="18 16"/>
    <text x="450" y="594" text-anchor="middle" fill="#7b5b32" font-size="54" font-family="sans-serif">专属花语卡片</text>
    <text x="450" y="674" text-anchor="middle" fill="#9a8052" font-size="32" font-family="sans-serif">图片内容待补充</text>
  </svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "flower-language-card.svg";
  link.click();
  URL.revokeObjectURL(url);
}

function PlantActionsModal({ onClose, onOpenFlowerCard, onOpenClass }) {
  return (
    <Modal title="植物手作" onClose={onClose}>
      <div className="modal-main interaction-modal-main plant-action-modal">
        <button className="primary-button full-button plant-action-button" type="button" onClick={onOpenFlowerCard}>
          生成我的专属花卡
        </button>
        <button className="secondary-button full-button plant-action-button" type="button" onClick={onOpenClass}>
          非遗手作线下课堂
        </button>
      </div>
    </Modal>
  );
}

function FlowerLanguageModal({ onClose }) {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const selectedFlowerOption = FLOWER_OPTIONS.find((flower) => flower.id === selectedFlower);

  return (
    <Modal title={isGenerated ? "我的专属花卡" : "选择一朵你喜爱的花"} onClose={onClose}>
      <div className="modal-main interaction-modal-main">
        {!isGenerated ? (
          <>
            <div className="flower-option-grid">
              {FLOWER_OPTIONS.map((flower) => (
                <button
                  className={selectedFlower === flower.id ? "flower-option selected" : "flower-option"}
                  key={flower.id}
                  type="button"
                  onClick={() => setSelectedFlower(flower.id)}
                  aria-label={flower.label}
                >
                  <img src={flower.imageSrc} alt="" />
                </button>
              ))}
            </div>
            <button
              className="primary-button full-button flower-generate-button"
              type="button"
              disabled={!selectedFlower}
              onClick={() => setIsGenerated(true)}
            >
              生成花卡
            </button>
          </>
        ) : (
          <div className="flower-card-placeholder">
            {selectedFlowerOption ? <img src={selectedFlowerOption.imageSrc} alt="" /> : null}
            <p>花卡图片区域</p>
            <span>待补充对应花卡图片</span>
          </div>
        )}
      </div>
    </Modal>
  );
}

function CraftClassModal({ onClose }) {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <Modal title="\u975E\u9057\u624B\u4F5C\u7EBF\u4E0B\u8BFE\u5802" onClose={onClose}>
      <div className="modal-main interaction-modal-main">
        <p>\u6307\u5C16\u62C8\u82B1\u8DA3\u5473\u624B\u5DE5\u4F53\u9A8C\uFF0C\u4EB2\u624B\u89E6\u6478\u4F20\u7EDF\u5DE5\u827A\u4E4B\u7F8E\uFF0C\u67E5\u770B\u8BFE\u7A0B\u8868\u5373\u523B\u62A5\u540D\u3002</p>
        <button className="primary-button full-button" type="button" onClick={() => setShowSchedule(true)}>
          \u7ACB\u523B\u62A5\u540D
        </button>
        {showSchedule && (
          <div className="course-schedule-placeholder">
            <p>\u8BFE\u7A0B\u8868</p>
            <span>\u8BFE\u7A0B\u8868\u56FE\u7247\u5F85\u8865\u5145</span>
          </div>
        )}
      </div>
    </Modal>
  );
}

function IslandPassModal({ onClose }) {
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const [submittedIdentity, setSubmittedIdentity] = useState("");

  return (
    <Modal title="\u8FDB\u5165\u732B\u5C9B" onClose={onClose}>
      <div className="modal-main interaction-modal-main">
        {!submittedIdentity ? (
          <>
            <p>\u8BF7\u9009\u62E9\u4F60\u7684\u5165\u5C9B\u5F62\u6001\uFF1A</p>
            <div className="island-identity-options">
              {ISLAND_IDENTITIES.map((identity, index) => (
                <button
                  className={selectedIdentity === identity ? "island-identity-option selected" : "island-identity-option"}
                  key={identity}
                  type="button"
                  onClick={() => setSelectedIdentity(identity)}
                >
                  <strong>{String.fromCharCode(65 + index)}.</strong>
                  {identity}
                </button>
              ))}
            </div>
            <button
              className="primary-button full-button"
              type="button"
              disabled={!selectedIdentity}
              onClick={() => setSubmittedIdentity(selectedIdentity)}
            >
              \u63D0\u4EA4
            </button>
          </>
        ) : (
          <>
            <div className="island-pass-card">
              <div className="island-pass-card__header">
                <span>\u9AD8\u6865\u732B\u5C9B</span>
                <strong>\u4E34\u65F6\u5C9B\u6C11\u8BC1</strong>
              </div>
              <div className="island-pass-card__body">
                <div className="island-pass-avatar" aria-hidden="true">
                  <span>\u55B5</span>
                </div>
                <dl>
                  <div><dt>\u5C9B\u6C11\u8EAB\u4EFD</dt><dd>{submittedIdentity}</dd></div>
                  <div><dt>\u5165\u5C9B\u72B6\u6001</dt><dd>\u5143\u6C14\u542F\u52A8\u4E2D</dd></div>
                  <div><dt>\u6709\u6548\u671F</dt><dd>\u4ECA\u65E5\u4E00\u6574\u5929</dd></div>
                </dl>
              </div>
              <p>\u51ED\u6B64\u8BC1\u4EF6\uFF0C\u53EF\u5728\u732B\u5C9B\u81EA\u7531\u5438\u732B\u3001\u6536\u96C6\u9633\u5149\u3001\u8865\u5145\u5FEB\u4E50\u80FD\u91CF\u3002</p>
            </div>
            <button className="primary-button full-button" type="button" onClick={onClose}>
              \u5173\u95ED
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function DeerCabinModal({ onClose }) {
  return (
    <Modal title="鹿鹿互动提示" onClose={onClose}>
      <div className="modal-main interaction-modal-main">
        <p>靠近鹿鹿时，请放慢脚步、降低声音，把手里的食物收好。让沙悟净陪你一起安静观察，给梅花鹿和自己都留一段舒服的距离。</p>
        <div className="course-schedule-placeholder">
          <p>梅花鹿小屋</p>
          <span>轻轻靠近，安静相遇</span>
        </div>
        <button className="primary-button full-button" type="button" onClick={onClose}>
          我知道啦
        </button>
      </div>
    </Modal>
  );
}

function CatOracleModal({ point, onClose }) {
  const [fortune, setFortune] = useState(null);

  function drawFortune() {
    const nextFortune = ORACLE_FORTUNES[Math.floor(Math.random() * ORACLE_FORTUNES.length)];
    setFortune(nextFortune);
  }

  return (
    <Modal title="猫神占卜" onClose={onClose}>
      <div className="modal-main interaction-modal-main oracle-modal-main">
        <p>{point.activityText}</p>
        <img className="oracle-scene-image" src="/images/cat-oracle-scene.png" alt="猫神占卜" />
        <button className="primary-button full-button" type="button" onClick={drawFortune}>
          求签
        </button>
        {fortune && (
          <div className="oracle-fortune-card">
            <div className="oracle-fortune-stick">
              <span>猫神签</span>
              <strong>{fortune.title}</strong>
            </div>
            <p>{fortune.text}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

function InstallationStoryModal({ point, onClose }) {
  return (
    <Modal title="高桥寻喵志" onClose={onClose}>
      <div className="modal-main interaction-modal-main installation-story-modal">
        {point.activityText.split("\n").map((line, index) =>
          line ? <p key={`${line}-${index}`}>{line}</p> : <span className="story-spacer" key={`space-${index}`} />
        )}
      </div>
    </Modal>
  );
}

export default function MainInteractionScreen({
  isCatMoved,
  onCatClick,
  onOpenAtlasHome,
  onOpenCatModal,
  onOpenMusicModal,
  point
}) {
  const [activeInteractionModal, setActiveInteractionModal] = useState(null);
  const isCafePoint = point.id === "cafe";
  const isCatIslandPoint = point.id === "cat-island";
  const isLawnPoint = point.id === "lawn";
  const isCatOraclePoint = point.id === "cat-oracle";
  const isInstallationPoint = point.id === "installation";

  function handleCatClick() {
    if (isCafePoint) {
      setActiveInteractionModal("plant-actions");
      return;
    }

    if (isCatOraclePoint) {
      setActiveInteractionModal("oracle");
      return;
    }

    if (isInstallationPoint) {
      setActiveInteractionModal("installation-story");
      return;
    }

    onCatClick();
  }

  function renderInteractionTip() {
    if (isCafePoint) {
      return null;
    }

    if (isCatIslandPoint) {
      return <p>{point.activityText}</p>;
    }

    if (isLawnPoint) {
      return (
        <div className="custom-interaction-actions custom-interaction-actions--story">
          <p>{point.activityText}</p>
          <button type="button" onClick={() => setActiveInteractionModal("deer")}>
            鹿鹿互动提示
          </button>
        </div>
      );
    }

    if (isCatOraclePoint || isInstallationPoint) {
      return null;
    }

    return point.activityText;
  }

  return (
    <section className="interaction-v03">
      <div className="interaction-stage">
        {!isCatOraclePoint && !isCafePoint && !isInstallationPoint && (
          <div className={isCatMoved ? "activity-tip shown" : "activity-tip"}>
            {renderInteractionTip()}
          </div>
        )}
        <div className={isCatMoved ? "comic-cat-stack moved" : "comic-cat-stack"}>
          <PawPalCat
            className="comic-cat"
            point={point}
            type="comic"
            onClick={handleCatClick}
          />
          <div className="comic-cat-bubble">点点我，会有惊喜喔</div>
        </div>
      </div>

      <div className="interaction-label">
        <p>{point.pointType}</p>
        <h2>{point.pointName}</h2>
      </div>

      <nav className="bottom-actions" aria-label="\u70B9\u4F4D\u4E92\u52A8">
        <IconButton
          iconSrc={BOTTOM_ACTIONS.cat.iconSrc}
          kind="cat"
          label={BOTTOM_ACTIONS.cat.label}
          onClick={onOpenCatModal}
        />
        <IconButton
          iconSrc={BOTTOM_ACTIONS.atlas.iconSrc}
          kind="atlas"
          label={BOTTOM_ACTIONS.atlas.label}
          onClick={onOpenAtlasHome}
        />
        <IconButton
          iconSrc={BOTTOM_ACTIONS.music.iconSrc}
          kind="music"
          label={BOTTOM_ACTIONS.music.label}
          onClick={onOpenMusicModal}
        />
      </nav>

      {activeInteractionModal === "flower" && (
        <FlowerLanguageModal onClose={() => setActiveInteractionModal(null)} />
      )}
      {activeInteractionModal === "plant-actions" && (
        <PlantActionsModal
          onClose={() => setActiveInteractionModal(null)}
          onOpenClass={() => setActiveInteractionModal("class")}
          onOpenFlowerCard={() => setActiveInteractionModal("flower")}
        />
      )}
      {activeInteractionModal === "class" && (
        <CraftClassModal onClose={() => setActiveInteractionModal(null)} />
      )}
      {activeInteractionModal === "island" && (
        <IslandPassModal onClose={() => setActiveInteractionModal(null)} />
      )}
      {activeInteractionModal === "deer" && (
        <DeerCabinModal onClose={() => setActiveInteractionModal(null)} />
      )}
      {activeInteractionModal === "oracle" && (
        <CatOracleModal point={point} onClose={() => setActiveInteractionModal(null)} />
      )}
      {activeInteractionModal === "installation-story" && (
        <InstallationStoryModal point={point} onClose={() => setActiveInteractionModal(null)} />
      )}
    </section>
  );
}
