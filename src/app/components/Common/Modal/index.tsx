import React from "react";
import style from "./Modal.module.scss";
const Modal: React.FC<{ children: React.ReactNode; open: boolean }> = ({
  children,
  open,
}) => {
  return (
    <>
      {open && (
        <div className={style.modal__overlay}>
          <div className={style.modal__wrapper}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
