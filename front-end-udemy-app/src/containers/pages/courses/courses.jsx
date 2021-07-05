// @flow
import React, { useEffect } from "react";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { CourseList } from "./courseList/courseList";
import { Footer } from "../../footer/footer";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { reducer, COURSES_ACTION } from "./reducer/reducer";
import "./style.scss";
export const Courses = (props) => {
  let params = useParams();
  let { url } = useRouteMatch();
  const location = useLocation();
  useEffect(() => {

    //console.log(path, url, params, new URLSearchParams(location.search).get('catId'));
  }, [])

  return (
    <div className="courses-page">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="courses-page__body">
        <div className="wrap">
          <CourseList search={false} title={""}></CourseList>
        </div>
      </div>
      <Footer coverFooter={true}></Footer>
    </div>
  );
};
