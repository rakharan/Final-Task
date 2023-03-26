import React from "react";
import classes from "./Modal.module.css";
const ModalManual = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClick} />

      <dialog
        open={true}
        className={`${classes.modal} fixed top-0 right-0 left-0 z-50  overflow-x-hidden md:inset-0 items-center justify-center`}
      >
        <div
          className="flex justify-end font-bold text-2xl pr-4 pt-4 cursor-pointer"
          onClick={props.onClick}
        >
          X
        </div>
        {props.children}
      </dialog>
    </>
  );
};

export default ModalManual;
