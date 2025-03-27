import React from "react";
import Style  from "./FormGroup.module.css";

type Props ={
  label: string
  children: React.ReactNode
}

const FormGroup: React.FC<Props> = ({ label, children }) => {
  return (
    <div className={Style.container}>
      <label className={Style.label}>{label}</label>
      <div className={Style.inputContainer}>
        {children}
      </div>
    </div>
  );
};
export default FormGroup;