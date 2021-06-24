// @flow
import React, { useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../../../../components";
import courseImage from "../../../../../public/image/course_1.jpg";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
export const CoursesOwner = (props) => {
  const [activeFilter, setActiveFilter] = useState(-1);
  SwiperCore.use([Mousewheel, Pagination]);
  return (
    <div className={`courses-owner ${props.className}`}>
      <div className="courses-owner__fix">
        <div className="left-block-owner">
          <div className="left-block-owner__fix">
            <div className="filter-header">Filter characters</div>
            <div className="filter-content">
              {dataSet_characters.map((item, index) => {
                return (
                  <div
                    className={`filter-content__item ${
                      index === activeFilter ? "active" : ""
                    }`}
                    data-id={index}
                    key={index}
                    onClick={(e) => {
                      setActiveFilter(+e.target.getAttribute("data-id"));
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="right-block-owner">
          <div className="right-block-owner__fix">
            <div className="right-block-owner__search">
              <i
                className="fa fa-search right-block-owner__search-icon"
                aria-hidden="true"
              ></i>
              <input
                placeholder="Type here to search"
                className="right-block-owner__search-input"
              ></input>
            </div>
            <div className="right-block-owner__list-course">
              <div className="list-course__headers">
                <div className="list-course__headers__title">
                  Danh sách khóa học của bạn
                </div>
                <Button
                  className="list-course__headers__btn-add btn--square"
                  bodyClassName="body-button"
                >
                  Thêm mới
                </Button>
              </div>
              <div className="list-course__content">
                {dataSet.length === 0 ? (
                  <div className="empty-course">
                    
                    ( Hiện chưa có khóa học )
                  </div>
                ) : (
                  <Swiper
                    direction={"horizontal"}
                    mousewheel={true}
                    pagination={{
                      clickable: true,
                    }}
                    slidesPerView={3}
                    spaceBetween={16}
                    className="mySwiper list-course__content-block-courses"
                  >
                    {dataSet.map((course) => {
                      return (
                        <SwiperSlide>
                          <div className="slide-item">
                            <div
                              className="slide-item__image"
                              style={{ backgroundImage: `url(${courseImage})` }}
                            ></div>
                            <div className="slide-item__body">
                              <p className="slide-item__body-title">
                                The Complete Digital Marketing Course - 12
                                Courses in 1
                              </p>
                              <div className="slide-item__body-time">
                                <p>
                                  Đăng tải:{" "}
                                  <span className="text-main">26/05/2021</span>
                                </p>
                                <p>
                                  Cập nhật lần cuối:{" "}
                                  <span className="text-main">26/05/2021</span>
                                </p>
                                <p>
                                  Trạng thái:{" "}
                                  <span className="text-warning">
                                    Chưa hoàn thành
                                  </span>
                                </p>
                              </div>
                              <div className="slide-item__body-info-course">
                                <div className="block-flex-horizontal">
                                  <p>
                                    <span className="text-main">3</span> bài
                                    giảng
                                  </p>
                                  <p>
                                    <span className="text-main">3</span> videos
                                  </p>
                                </div>
                                <div className="block-flex-horizontal">
                                  <p>
                                    <span className="text-main">3</span> học
                                    viên
                                  </p>
                                  <p className="text-danger">160.000 VND</p>
                                </div>
                              </div>
                              <Button
                                bodyClassName="slide-item__body-content-btn"
                                className="btn--square slide-item__body-btn"
                                content="Chỉnh sửa"
                              ></Button>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dataSet = new Array(0).fill("");
const dataSet_characters = new Array(26).fill().map((item, index) => {
  return String.fromCharCode(65 + index);
});
