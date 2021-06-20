// @flow
import * as React from "react";
import { Button } from "../../../../../components";
import "./style.scss";
export const StudentInfo = ({info}) => {
  return (
    <div className="student-info">
      <div className="avatar">
        <img src={info.avatar}></img>
        <div className="btn-change-image">
          <i className="fa fa-camera" aria-hidden="true"></i>
        </div>
      </div>
      <div className="info">
        <p className="info__name">{info.name}</p>
        <p className="info__email">{info.email}</p>
        <p className="info__role">
          <i className="fa fa-graduation-cap icon" aria-hidden="true"></i>
          {info.role}
        </p>
      </div>
      <div className="student-contact">
        <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
      </div>
      <Button
        className="btn-edit-profile btn--hover-change-color"
        content="Edit profile"
      ></Button>
      <div className="cover--bottom"></div>
    </div>
  );
};
