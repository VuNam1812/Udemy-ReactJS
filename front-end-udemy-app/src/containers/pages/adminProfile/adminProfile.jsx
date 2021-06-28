// @flow
import React, { useReducer } from "react";
import "./style.scss";
import {
  NavPage,
  AdminInfo,
  Dashboard,
  Courses,
  Categories,
  Accounts,
} from "./itemPage";
import { Background } from "../teacherProfile/teacherProfileItems";

const ACTION = {
  ACTIVE_DASHBOARD: 1,
  ACTIVE_COURSES: 2,
  ACTIVE_CATEGORIES: 3,
  ACTIVE_ACCOUNTS: 4,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.ACTIVE_DASHBOARD:
      return {
        ...state,
        currectActive: 1
      };
    case ACTION.ACTIVE_COURSES:
      return {
        ...state,
        currectActive: 2,
      };
    case ACTION.ACTIVE_CATEGORIES:
      return {
        ...state,
        currectActive: 3,
      };
    case ACTION.ACTIVE_ACCOUNTS:
      return {
        ...state,
        currectActive: 4,
      };
    default:
      return state;
  }
};

const initState = {
  currectActive: 1,
};

export const AdminProfile = (props) => {
  const [activeItem, dispatch] = useReducer(reducer, initState);
  return (
    <div className="admin-profile">
      <Background className="admin-profile__bg"></Background>
      <NavPage activeItem={activeItem} dispatch={dispatch}></NavPage>
      <AdminInfo></AdminInfo>
      <div className="admin-profile__body">
        <div className="wrap">
          {(() => {
            switch (activeItem.currectActive) {
              case 1:
                return <Dashboard dispatch={dispatch}></Dashboard>;
              case 2:
                return <Courses></Courses>;
              case 3:
                return <Categories></Categories>;
              case 4:
                return <Accounts></Accounts>;
              default:
                return <></>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
