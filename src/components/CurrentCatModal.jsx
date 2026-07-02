import Modal from "./Modal.jsx";
import PawPalCat from "./PawPalCat.jsx";

export default function CurrentCatModal({ onClose, point }) {
  const profilePoint = {
    ...point,
    realCatImageSrc: point.profileImageSrc || point.realCatImageSrc
  };

  return (
    <Modal title="宠物图鉴" onClose={onClose}>
      <div className="modal-main cat-profile">
        <PawPalCat className="modal-cat-image" point={profilePoint} type="real" />
        <h3>{point.catName}</h3>
        <dl className="pet-profile-list">
          <div><dt>性格</dt><dd>{point.catPersonality}</dd></div>
          <div><dt>出生</dt><dd>{point.catBirthDate}</dd></div>
          <div><dt>爱好</dt><dd>{point.catHobbies}</dd></div>
        </dl>
      </div>
    </Modal>
  );
}
