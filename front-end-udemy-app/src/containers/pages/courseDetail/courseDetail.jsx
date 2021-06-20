// @flow
import React from "react";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import { ReadyJoin } from "../home/readyJoin/readyJoin";
import { InComing } from "../../incoming/inComing";
import { Introduce, Videos, Teacher, Feedback } from "./descContent";

import { Button, NavTab } from "../../../components";
import course_1 from "../../../public/image/course_1.jpg";
import "./style.scss";
export const CourseDetail = (props) => {
  return (
    <div className="course-detail">
      <HeaderUpper></HeaderUpper>
      <InComing></InComing>
      <div className="wrap">
        <div className="course-detail__body">
          <div className="content">
            <NavTab
              className='tab-course'
              headers={["Giới thiệu", "Giảng viên", "Video", "Đánh giá"]}
              blocks={[
                <Introduce></Introduce>,
                <Teacher></Teacher>,
                <Videos></Videos>,
                <Feedback></Feedback>,
              ]}
            ></NavTab>
            <div className="left-content">
              <div className="left-content__body">
                <div
                  className="image-course"
                  style={{ backgroundImage: `url(${course_1})` }}
                >
                  <Button className="image-course__btn btn-afer-rounded">
                    <i
                      className="fa fa-play fa-3x image-course__icon"
                      aria-hidden="true"
                    ></i>
                  </Button>
                  <p className="image-course__desc">Preview this course</p>
                </div>

                <div className="join-course">
                  <p className="join-course__price">100.000 VND</p>
                  <Button
                    className="join-course__add-fav-btn btn-smaller btn--hover-horizontal-change-color"
                    content="Add to Favorite!"
                  ></Button>
                  <Button
                    className="join-course__join-btn btn--color-white btn--hover-vertical-change-color-reverse"
                    content="Join now!"
                  ></Button>
                </div>

                <div className="sub-desc">
                  <p className="sub-desc__title">Khóa học này bao gồm</p>
                  <div className="sub-desc__detail">
                    <p className="sub-desc__detail-item">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>2 giờ
                    </p>
                    <p className="sub-desc__detail-item">
                      <i className="fa fa-refresh" aria-hidden="true"></i>Truy
                      cập mọi lúc
                    </p>
                    <p className="sub-desc__detail-item">
                      <i className="fa fa-mobile fa-lg" aria-hidden="true"></i>
                      Học tập ngay trên điện thoại di động
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReadyJoin></ReadyJoin>
      <Footer></Footer>
    </div>
  );
};
