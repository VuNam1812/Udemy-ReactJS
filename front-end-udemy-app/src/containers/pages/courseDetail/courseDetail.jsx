// @flow
import React, { useReducer, useEffect } from "react";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import { ReadyJoin } from "../home/readyJoin/readyJoin";
import { InComing } from "../../incoming/inComing";
import { Introduce, Videos, Teacher, Feedback } from "./descContent";

import { Button, NavTab } from "../../../components";
import "./style.scss";

import numeral from "numeral";
import { reducer, COURSE_DETAIL_ACTION } from "./reducer/reducer";
import { handleCourseDetail } from "./middleware/handleCourseDetal";
import { useParams } from "react-router-dom";

const initData = {
  course: {},
  teacher: {},
  lectures: [],
  feedbacks: {},
  activeTab: 0,
};

export const CourseDetail = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const params = useParams();

  const handleTabActive = async (index) => {
    switch (index) {
      case 0:
        if (Object.keys(store.course).length !== 0) return;
        await handleCourseDetail.loadCourse(params, dispatch);
        break;
      case 1:
        if (Object.keys(store.teacher).length !== 0) return;
        await handleCourseDetail.loadTeacher(
          {
            userId: store.course.teacherId,
          },
          dispatch
        );
        break;
      case 2:
        if (Object.keys(store.lectures).length !== 0) return;
        await handleCourseDetail.loadLectures(params, dispatch);
        break;
      case 3:
        if (Object.keys(store.feedbacks).length !== 0) return;
        await handleCourseDetail.loadFeedbacks(params, dispatch);
        break;
    }
  };

  return (
    <div className="course-detail">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <InComing></InComing>
      <div className="wrap">
        <div className="course-detail__body">
          <div className="content">
            <NavTab
              className="tab-course"
              headers={["Giới thiệu", "Giảng viên", "Video", "Đánh giá"]}
              blocks={[
                <Introduce course={store.course}></Introduce>,
                <Teacher teacher={store.teacher}></Teacher>,
                <Videos lessions={store.lectures}></Videos>,
                <Feedback rate={store.course.rate} feedbacks={store.feedbacks}></Feedback>,
              ]}
              onChangeActive={handleTabActive}
            ></NavTab>
            <div className="left-content">
              <div className="left-content__body">
                {store.course.srcImage && (
                  <div
                    className="image-course"
                    style={{
                      backgroundImage: `url("http://localhost:3030/${store.course.srcImage.replaceAll(
                        "\\",
                        "/"
                      )}")`,
                    }}
                  >
                    <Button className="image-course__btn btn-afer-rounded">
                      <i
                        className="fa fa-play fa-3x image-course__icon"
                        aria-hidden="true"
                      ></i>
                    </Button>
                    <p className="image-course__desc">Giới thiệu khóa học</p>
                  </div>
                )}

                <div className="join-course">
                  <p className="join-course__price">
                    {numeral(store.course.price).format("0,0")} VND
                  </p>
                  <Button
                    className="join-course__add-fav-btn btn-smaller btn--hover-horizontal-change-color"
                    content="Thêm vào yêu thích!"
                  ></Button>
                  <Button
                    className="join-course__join-btn btn--color-white btn--hover-vertical-change-color-reverse"
                    content="Ghi danh"
                  ></Button>
                </div>

                <div className="sub-desc">
                  <p className="sub-desc__title">Khóa học này bao gồm</p>
                  <div className="sub-desc__detail">
                    {store.course.duration && (
                      <p className="sub-desc__detail-item">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {new Date(1000 * +store.course.duration)
                          .toISOString()
                          .substr(11, 5)}{" "}
                        giờ
                      </p>
                    )}
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
