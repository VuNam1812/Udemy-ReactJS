// @flow
import React, { useEffect, useReducer } from "react";
import { Background, InfoTeacher, CoursesOwner } from "./teacherProfileItems";
import { Logo } from "../../../components";
import "./style.scss";

import { useParams } from "react-router-dom";

import { reducer, TEACHER_PROFILE_ACTION } from "./reducer/reducer";
import { handleTeacheDashboard } from "./middlewares/handleTeacherDashboard";
const initData = {
  account: {},
  courses: [],
  active: 2,
};

export const TeacherProfile = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const params = useParams();
  useEffect(() => {
    (async () => {
      await handleTeacheDashboard.loadAccount(params, dispatch);
      await handleTeacheDashboard.loadCourseOwner(params, dispatch);
    })();
  }, []);

  const updateActive = (e) => {
    dispatch({
      type: TEACHER_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: +e.currentTarget.getAttribute("data-id"),
    });
  };

  return (
    <div className="teacher-profile">
      <Background></Background>
      <div className="teacher-profile__left-content">
        <Logo className="logo--shadow"></Logo>
        <div className="left-content__menu ">
          <div
            className={`left-content__menu-item ${
              store.active === 1 ? "active" : ""
            }`}
            onClick={updateActive}
            data-id="1"
          >
            <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>My
            Profile
          </div>
          <div
            className={`left-content__menu-item ${
              store.active === 2 ? "active" : ""
            }`}
            onClick={updateActive}
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
                dispatch={dispatch}
                teacher={store.account}
                className={`body-profile__content-info ${
                  store.active === 1 ? "active" : "hidden"
                }`}
              ></InfoTeacher>
              <CoursesOwner
                account={store.account}
                courses={store.courses}
                dispatch={dispatch}
                className={`body-profile__content-courses ${
                  store.active === 2 ? "active" : "hidden"
                }`}
              ></CoursesOwner>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
