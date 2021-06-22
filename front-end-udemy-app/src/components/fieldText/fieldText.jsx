// @flow
import * as React from "react";
import "./style.scss";
export const FieldText = ({ value, type, className, label, onChange }) => {
  return (
    <div className={`field-text ${className}`}>
      <input
        className="field-text__input"
        type={type}
        value={value}
        onChange={onChange}
      ></input>
      <p className="field-text__label">{label}</p>
    </div>
  );
};
