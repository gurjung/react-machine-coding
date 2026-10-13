import React, { useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import DialogBox from "./DialogBox";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [settings, setSettings] = useState({
    closeOnOutsideClick: false,
    closeOnEscape: false,
    showCloseIcon: false,
    showBackdrop: true,
  });

  const handleSettingChange =
    (type: keyof typeof settings) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, [type]: e.target.checked }));
    };

  const onButtonClick = () => {
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <h1>Modal Popup</h1>
      {/* all checkboxes */}
      <CustomCheckbox
        labelText="Close dialog on outside click"
        isChecked={settings.closeOnOutsideClick}
        onChange={handleSettingChange("closeOnOutsideClick")}
      />

      <CustomCheckbox
        labelText="Close dialog on escape"
        isChecked={settings.closeOnEscape}
        onChange={handleSettingChange("closeOnEscape")}
      />

      <CustomCheckbox
        labelText="Show close icon"
        isChecked={settings.showCloseIcon}
        onChange={handleSettingChange("showCloseIcon")}
      />

      <CustomCheckbox
        labelText="Show backdrop"
        isChecked={settings.showBackdrop}
        onChange={handleSettingChange("showBackdrop")}
      />
      <button onClick={onButtonClick}>Open Modal</button>
      <DialogBox
        isModalOpen={isModalOpen}
        closeModal={onCloseModal}
        settings={settings}
      />
    </div>
  );
};

export default Modal;
