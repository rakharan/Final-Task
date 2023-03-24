import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={` w-[112px] h-[41px] rounded-[5px] border-2 border-[#EC7AB7] font-bold text-sm text-center transition-all duration-500 ${props.className}`}
        type={props.type}
        value={props.value}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
