import Modal from "./Modal.jsx";
import PawPalCat from "./PawPalCat.jsx";

export default function CurrentCatModal({ collectedCats, onClose, point, total }) {
  return (
    <Modal title="猫咪图鉴" onClose={onClose}>
      <div className="modal-main cat-profile">
        <PawPalCat className="modal-cat-image" point={point} type="real" />
        <h3>{point.catName}</h3>
        <dl>
          <div><dt>性格</dt><dd>{point.catPersonality}</dd></div>
          <div><dt>出生</dt><dd>{point.catBirthDate}</dd></div>
          <div><dt>爱好</dt><dd>{point.catHobbies}</dd></div>
          <div><dt>地点</dt><dd>{point.pointName}</dd></div>
        </dl>
        <p>{point.catDescription}</p>
      </div>
      <div className="modal-progress">收集进度 {collectedCats.length} / {total}</div>
    </Modal>
  );
}
