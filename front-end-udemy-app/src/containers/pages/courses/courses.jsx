// @flow 
import * as React from 'react';
import { HeaderUpper } from '../../header/HeaderUpper/headerUpper';
import { CourseList } from './courseList/courseList';
import { Footer } from '../../footer/footer';
import './style.scss';
export const Courses = (props) => {
    return (
      <div className="courses-page">
        <HeaderUpper className="header--zoom-80"></HeaderUpper>
        <div className="courses-page__body">
          <div className="wrap">
            <CourseList></CourseList>
          </div>
        </div>
        <Footer coverFooter={true}></Footer>
      </div>
    );
};