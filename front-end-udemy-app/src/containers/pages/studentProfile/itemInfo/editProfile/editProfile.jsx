// @flow
import React, { useState } from "react";
import { Button, FieldText, RadioButton } from "../../../../../components";
import "./style.scss";

export const EditProfile = (props) => {
  return (
    <div className={`edit-profile ${props.className}`}>
      <div className='edit-profile__header'>
        Thông tin tài khoản
      </div>
      <div className="edit-profile__form-group">
        <div className="block-flex">
          <FieldText placeHolder="First Name" label="First Name"></FieldText>
          <FieldText placeHolder="Last Name" label="Last Name"></FieldText>
        </div>
        <FieldText placeHolder="Email" label="Email"></FieldText>
        <FieldText placeHolder="Phone number" label="Phone number"></FieldText>
        <div className="change-password">
          <FieldText
            placeHolder="Password"
            label="Password"
            type="password"
            value="******************"
          ></FieldText>
          <div
            className="change-password__link"
            onClick={props.handleOpenModal}
          >Đổi mật khẩu</div>
        </div>
        <RadioButton
          items={dataSet}
          value="0"
          onChange={() => {}}
        ></RadioButton>
      </div>
      <div className="btn-groups-edit">
        <div className="edit-profile__btn-controls">
          <Button
            className="btn--color-white"
            content="Cancel"
            onClick={() => {
              props.setStep(1);
            }}
          ></Button>
          <Button
            className="btn--hover-change-color"
            content="Update "
            onClick={() => {
              props.setStep(1);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

const dataSet = ["Male", "Female", "Other"];
