// @flow
import * as React from "react";
import "./style.scss";
export const UserAccount = ({ account }) => {
  return (
    <div className="user-account">
      <div className="user-account__header">
        <div className="header__info">
          <p className="account-info__name">{account.username}</p>
          <p className="account-info__role">{account.role}</p>
        </div>
        <div
          className="header__image"
          style={{
            backgroundImage: `url("http://localhost:3030/${+account.imgSrc}")`,
          }}
        ></div>
        <div className="user-account__options">
          <div className="option__item">
            <i className="icon fa fa-info" aria-hidden="true"></i>Quản lý cá
            nhân
          </div>
          <hr></hr>
          <div className="option__item">
            <i className="icon fa fa-sign-out" aria-hidden="true"></i>Thoát
          </div>
        </div>
      </div>
    </div>
  );
};
