// @flow
import React, { useState } from "react";
import { Button, FieldText, RadioButton } from "../../../../../components";
import "./style.scss";
import teacherImage from "../../../../../public/image/teacher_1.png";
export const AdminInfo = (props) => {
  const [active, setActive] = useState("mini-show");
  return (
    <div className={`admin-info ${active}`}>
      <div className="admin-info__content">
        <div className="content-view">
          <div className="content-view__image">
            <img src={teacherImage}></img>
            <div className="image__change-avatar">
              <i className="icon fa fa-camera" aria-hidden="true"></i>
            </div>
          </div>
          <div className="content-view__info">
            <p className="info__name">Admin</p>
            <p className="info__email">admin@gmail.com</p>
            <p className="info__role">
              <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>
              Quản trị viên
            </p>
          </div>
          <Button
            className="content-view__btn-edit btn--square"
            bodyClassName="btn-edit__body"
            content="Edit"
            onClick={() => {
              setActive("show-full");
            }}
          ></Button>
        </div>
        <div className="content-edit">
          <div className="content-edit__header">
            <p>Thông tin tài khoản</p>
          </div>
          <div className="content-edit__body">
            <div className="block-flex">
              <FieldText
                placeHolder="First Name"
                label="First Name"
              ></FieldText>
              <FieldText placeHolder="Last Name" label="Last Name"></FieldText>
            </div>
            <FieldText placeHolder="Email" label="Email"></FieldText>
            <FieldText
              placeHolder="Phone number"
              label="Phone number"
            ></FieldText>
            <div className="body__change-password">
              <FieldText
                placeHolder="Password"
                label="Password"
                type="password"
                value="******************"
              ></FieldText>
              <div className="change-password__link">Đổi mật khẩu</div>
            </div>
            <RadioButton
              items={dataSet}
              value="0"
              onChange={() => {}}
            ></RadioButton>
          </div>
          <div className="content-edit__btn-group">
            <Button
              className="admin-info__btn-edit btn--color-white"
              content="Cancel"
              onClick={() => {
                setActive("mini-show");
              }}
            ></Button>
            <Button content="Save"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const dataSet = ["Male", "Female", "Other"];
