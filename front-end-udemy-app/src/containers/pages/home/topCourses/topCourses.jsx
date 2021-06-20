// @flow
import * as React from "react";
import "./style.scss";
import { Button } from "../../../../components";
import { CourseCard } from "../../../itemsPage";
export const TopCourses = (props) => {
  return (
    <div className="top-courses">
      <div className="wrap">
        <div className="top-courses-item">
          <div className="top-courses-item__title">
            <h2 className="top-courses-item__title-main">Our top courses</h2>
            <p className="top-courses-item__title-desc">
              Replenish him third creature and meat blessed void a fruit
              gathered you’re, they’re two waters own morning gathered. Get
              Stared{" "}
            </p>
          </div>
          <Button
            className="top-courses-item__btn-all btn--hover-horizontal-change-color"
            content="See more"
          ></Button>
        </div>
        {dataSet.map((course) => {
          return <CourseCard className='top-courses-item' course={course}></CourseCard>;
        })}
      </div>
    </div>
  );
};

const dataSet = [
  {
    id: 1,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 2,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 3,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 4,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
  {
    id: 5,
    courseName: "Our top courses",
    teacherName: "Vũ Thành Nam",
    coursePrice: 140,
    lectureCount: 12,
  },
];
