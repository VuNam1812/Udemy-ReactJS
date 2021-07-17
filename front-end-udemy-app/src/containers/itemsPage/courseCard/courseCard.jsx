// @flow
import React from "react";
import { Button, Card } from "../../../components";
import { Link } from "react-router-dom";
import "./style.scss";
import numeral from "numeral";
export const CourseCard = ({ course, className }) => {
  return (
    <Card
      className={`course-card ${className}`}
      popover={
        <div className="cover-popover">
          <div className="popover-course">
            <div
              className="popover-course__image"
              style={{
                backgroundImage: `url("http://localhost:3030/${course.srcImage.replaceAll(
                  "\\",
                  "/"
                )}")`,
              }}
            ></div>
            <p className="popover-course__name">{course.courName}</p>
            <p className="popover-course__teacherName">
              Giảng viên:{" "}
              <span className="text--main-color">{course.teacherName}</span>
            </p>
            <p className="popover-course__last-update">
              Cập nhật ngày:{" "}
              <span className="text--main-color">
                {new Date(course.lastUpdate).toLocaleDateString()}
              </span>
            </p>
            <p className="popover-course__desc">{course.tinyDes}</p>
            <div className="rate-course"></div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">{course.lectureCount}</span>{" "}
                videos
              </div>
              <div className="info-course__right">
                <span className="text--main-color">
                  {new Date(+course.duration * 1000)
                    .toISOString()
                    .substr(11, 5)}
                </span>{" "}
                giờ
              </div>
            </div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">
                  {numeral(course.joinerCount).format("0,0")}
                </span>{" "}
                học viên
              </div>
              <div className="info-course__right ">
                <span className="text--main-color text--large">
                  {numeral(course.price).format("0,0")} VND
                </span>
              </div>
            </div>
            <div className="btn-group">
              <Button
                className=" btn--hover-horizontal-change-color"
                content="Thêm vào yêu thích"
              ></Button>
              <Button className="btn--color-white" content="Chi tiết"></Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="item">
        <div className="cover-image">
          <div
            className="item__image"
            style={{
              backgroundImage: `url("http://localhost:3030/${course.srcImage.replaceAll(
                "\\",
                "/"
              )}")`,
            }}
          ></div>
        </div>
        <div className="item__body">
          <div className="item__title">
            <div className="title-main">
              <Link to={`/courses/${course.id}`} className="title-main__course-name">{course.courName}</Link>
              <h3 className="title-main__title-cate">{course.catName}</h3>
              <Link to={`/teachers/${course.id_owner}`} className="title-main__title-teacher">
                {course.teacherName}
              </Link>
            </div>
            <h3 className="item__title-course-price">
              {numeral(course.price).format("0,0")} VND
            </h3>
          </div>
          <div className="item__enroll-btn">
            <h3 className="lecture-count">{course.lectureCount} Bài giảng</h3>
            <Button
              className="btn-smaller btn--hover-change-color"
              content="Ghi danh"
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
