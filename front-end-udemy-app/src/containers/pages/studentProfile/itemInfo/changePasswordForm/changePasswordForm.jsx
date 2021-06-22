// @flow
import * as React from "react";
import "./style.scss";
import { FieldText, Button } from "../../../../../components";
export const ChangePasswordForm = (props) => {
  return (
    <div className="change-password-form">
      <div className="change-password-form__header">
        <p>Thay đổi mật khẩu</p>
      </div>
      <div className="change-password-form__group">
        <FieldText
          className="field--none-rounded"
          label="Mật khẩu cũ"
        ></FieldText>
        <FieldText
          className="field--none-rounded"
          label="Mật khẩu mới"
        ></FieldText>
        <FieldText
          className="field--none-rounded"
          label="Nhập lại mật khẩu mới"
        ></FieldText>
      </div>
      <div className="change-password-form__btn">
        <Button content="Thay đổi"></Button>
      </div>
    </div>
  );
};
