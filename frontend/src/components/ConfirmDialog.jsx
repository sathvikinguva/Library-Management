import Modal from "./Modal.jsx";

const ConfirmDialog = ({ open, title, description, onCancel, onConfirm }) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      actions={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full bg-brand-600 text-white"
          >
            Confirm
          </button>
        </div>
      }
    >
      <p className="text-sm text-slate-300">{description}</p>
    </Modal>
  );
};

export default ConfirmDialog;
