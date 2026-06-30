export default function Modal({ children, onClose, title }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-title-row">
          <h2>{title}</h2>
          <button className="close-button" type="button" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
