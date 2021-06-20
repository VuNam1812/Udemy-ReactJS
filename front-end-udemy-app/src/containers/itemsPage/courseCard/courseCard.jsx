// @flow
import * as React from "react";
import { Button, Card } from "../../../components";
import "./style.scss";
import imageCourse from "../../../public/image/course_1.jpg";

export const CourseCard = ({ course, className }) => {
  return (
    <Card
      className={`course-card ${className}`}
      popover={
        <div className="cover-popover">
          <div className="popover-course">
            <div
              className="popover-course__image"
              style={{ backgroundImage: `url(${imageCourse})` }}
            ></div>
            <p className="popover-course__name">Our top courses</p>
            <p className="popover-course__teacherName">
              Giảng viên: <span className="text--main-color">Vũ Thành Nam</span>
            </p>
            <p className="popover-course__last-update">
              Cập nhật ngày:{" "}
              <span className="text--main-color">27/06/2021</span>
            </p>
            <p className="popover-course__desc">
              Có thể hiểu retouch ảnh là chỉnh sửa hình ảnh để bức ảnh đẹp hơn,
              có hồn hơn. Nói một cách dễ hiểu đó là photoshop ảnh cho các bức
              ảnh
            </p>
            <div className="rate-course"></div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">13</span> videos
              </div>
              <div className="info-course__right">
                <span className="text--main-color">3.61</span> giờ
              </div>
            </div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">16</span> học viên
              </div>
              <div className="info-course__right ">
                <span className="text--main-color text--large">$ 140</span>
              </div>
            </div>
            <div className="btn-group">
              <Button
                className=" btn--hover-horizontal-change-color"
                content="Add Favorite"
              ></Button>
              <Button className="btn--color-white" content="Know more"></Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="item">
        <div className="cover-image">
          <div
            className="item__image"
            style={{ backgroundImage: `url(${imageCourse})` }}
          ></div>
        </div>
        <div className="item__body">
          <div className="item__title">
            <div className="title-main">
              <h3 className="title-main__course-name">{course.courseName}</h3>
              <h3 className="title-main__course-price">
                $ {course.coursePrice}
              </h3>
            </div>
            <p className="item__title-desc">{course.teacherName}</p>
          </div>
          <div className="item__enroll-btn">
            <h3 className="lecture-count">{course.lectureCount} Bài giảng</h3>
            <Button
              className="btn-smaller btn--hover-change-color"
              content="Enroll now"
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
