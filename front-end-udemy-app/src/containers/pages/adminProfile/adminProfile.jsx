// @flow
import React, { useReducer, useEffect, useContext } from "react";
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
import { reducer, ADMIN_PROFILE_ACTION } from "./reducer/reducer";
import { handleAdminProfile } from "./middleware/handleAdminProfile";
import { authContext } from "../../../contexts/auth/authContext";
const initState = {
  currectActive: 1,
  account: {},
  courses: [],
  teachers: [],
  user: [],
};

export const AdminProfile = (props) => {
  const [store_adminProfile, dispatch] = useReducer(reducer, initState);
  const { store_auth } = useContext(authContext);
  useEffect(() => {
    (async () => {
      await handleAdminProfile.loadAccount(store_auth.account, dispatch);
    })();
  }, [store_auth.account]);

  useEffect(() => {
    (async () => {
      switch (store_adminProfile.currectActive) {
        case 2:
          if (Object.keys(store_adminProfile.courses).length === 0)
            await handleAdminProfile.loadCourses(dispatch);
          if (Object.keys(store_adminProfile.teachers).length === 0)
            await handleAdminProfile.loadTeachers(dispatch);
          break;
        case 4:
          break;
        default:
          break;
      }
    })();
  }, [store_adminProfile.currectActive]);

  return (
    <div className="admin-profile">
      <Background className="admin-profile__bg"></Background>
      <NavPage activeItem={store_adminProfile} dispatch={dispatch}></NavPage>
      <AdminInfo
        account={store_adminProfile.account}
        adminProfileDispatch={dispatch}
      ></AdminInfo>
      <div className="admin-profile__body">
        <div className="wrap">
          {(() => {
            switch (store_adminProfile.currectActive) {
              case 1:
                return <Dashboard dispatch={dispatch}></Dashboard>;
              case 2:
                return (
                  <Courses
                    teachers={store_adminProfile.teachers}
                    courses={store_adminProfile.courses}
                  ></Courses>
                );
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
