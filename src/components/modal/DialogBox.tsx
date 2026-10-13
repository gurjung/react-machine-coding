import React, { useEffect, useRef } from "react";
import "./dialog.css";

interface IProps {
  isModalOpen: boolean;
  closeModal: () => void;
  settings: {
    closeOnOutsideClick: boolean;
    closeOnEscape: boolean;
    showCloseIcon: boolean;
    showBackdrop: boolean;
  };
}

const DialogBox = (props: IProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isModalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!props.isModalOpen && dialog.open) {
      dialog.close();
    }
  }, [props.isModalOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      if (!props.settings.closeOnEscape) {
        e.preventDefault();
      } else {
        props.closeModal();
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (props.settings.closeOnOutsideClick) {
      if (e.target === dialogRef.current) {
        props.closeModal();
      }
    }
  };

  return (
    <dialog
      id="my-dialog"
      aria-labelledby="dialog-title"
      className={props.settings.showBackdrop ? "dialog" : "dialog no-backdrop"}
      ref={dialogRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <h2 id="dialog-title">Modal Popup</h2>
      <p>This is the modal content.</p>

      {props.settings.showCloseIcon && (
        <button
          className="close-icon"
          onClick={props.closeModal}
          aria-label="Close dialog"
        >
          &times;
        </button>
      )}

      <button type="button" onClick={props.closeModal}>
        Close
      </button>
    </dialog>
  );
};

export default DialogBox;
