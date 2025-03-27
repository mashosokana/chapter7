import React, { ChangeEvent } from "react";
import style from "./Input.module.css";


type InputProps = {
  id: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({ 
  id, 
  type = "text", 
  value, 
  onChange,
  disabled = false
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={style.input}
    />

  );
};

export default Input;