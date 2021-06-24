// @flow
import React, { useState } from "react";
import { Background, InfoTeacher, CoursesOwner } from "./teacherProfileItems";
import { Logo } from "../../../components";
import "./style.scss";
export const TeacherProfile = (props) => {
  const [active, setActive] = useState(2);
  return (
    <div className="teacher-profile">
      <Background></Background>
      <div className="teacher-profile__left-content">
        <Logo className="logo--shadow"></Logo>
        <div className="left-content__menu ">
          <div
            className={`left-content__menu-item ${
              active === 1 ? "active" : ""
            }`}
            onClick={(e) => {
              setActive(+e.currentTarget.getAttribute("data-id"));
            }}
            data-id="1"
          >
            <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>My
            Profile
          </div>
          <div
            className={`left-content__menu-item ${
              active === 2 ? "active" : ""
            }`}
            onClick={(e) => {
              setActive(+e.currentTarget.getAttribute("data-id"));
            }}
            data-id="2"
          >
            <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>My
            Courses
          </div>
        </div>
      </div>
      <div className="teacher-profile__right-content">
        <div className="header-profile"></div>
        <div className="body-profile">
          <div className="body-profile__background">
            <div className="cover-flex">
              <InfoTeacher
                className={`body-profile__content-info ${
                  active === 1 ? "active" : "hidden"
                }`}
              ></InfoTeacher>
              <CoursesOwner
                className={`body-profile__content-courses ${
                  active === 2 ? "active" : "hidden"
                }`}
              ></CoursesOwner>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
