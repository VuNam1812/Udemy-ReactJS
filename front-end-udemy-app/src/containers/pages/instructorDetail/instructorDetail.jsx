// @flow
import * as React from "react";

import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import teacherImg from "../../../public/image/teacher_1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { CourseCard } from "../../itemsPage";
import "./style.scss";
export const InstructorDetail = (props) => {
  SwiperCore.use([Mousewheel, Pagination]);
  return (
    <div className="instructor-detail">
      <HeaderUpper></HeaderUpper>
      <div className="body-page">
        <div className="body-page__header">
          <div className="wrap">
            <div className="instructor__summary">
              <div
                className="instructor__summary-image"
                style={{ backgroundImage: `url(${teacherImg})` }}
              ></div>
              <div className="summary-text">
                <p className="summary-text__name">Hoàng Phúc Photo</p>
                <p className="summary-text__major">Photoshop</p>
              </div>
            </div>
            <div className="instructor__intro-achieve">
              <div className="achieve-item">
                <p className="achieve-item__count">70</p>
                <p className="achieve-item__text">Học viên</p>
              </div>
              <div className="achieve-item">
                <p className="achieve-item__count">4</p>
                <p className="achieve-item__text">Khóa học</p>
              </div>
              <div className="achieve-item">
                <div className="achieve-item__count">
                  3.5{" "}
                  <span className="text--smaller">
                    / 5 <i className="icon fa fa-star" aria-hidden="true"></i>
                  </span>
                </div>
                <p className="achieve-item__text">7 lượt đánh giá</p>
              </div>
            </div>
          </div>
        </div>
        <div className="body-page__content">
          <div className="wrap">
            <div className="instructor__intro">
              <p className="section-title">Giới thiệu</p>
              <div>
                <p className="block-empty">(Hiện đang còn trống)</p>
              </div>
            </div>
            <div className="instructor__technique">
              <p className="section-title">Kỹ Năng</p>
              <div>
                <p className="block-empty">(Hiện đang còn trống)</p>
              </div>
            </div>
            <div className="instructor__courses">
              <p className="section-title">
                Khóa học giảng dạy bởi giáo viên Hoàng Phúc Photo
              </p>

                {dataSet.length === 0 ? (
                  <p className="block-empty">(Hiện đang còn trống)</p>
                ) : (
                  (() => {
                    return dataSet.length <= 4 ? (
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={16}
                        className="mySwiper block-courses"
                      >
                        {dataSet.map((course) => {
                          return (
                            <SwiperSlide className="slide-item">
                              <CourseCard
                                className="slide-item__card"
                                course={course}
                              ></CourseCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    ) : (
                      <Swiper
                        direction={"horizontal"}
                        mousewheel={true}
                        pagination={{
                          clickable: true,
                        }}
                        slidesPerView={4}
                        loop={true}
                        spaceBetween={16}
                        className="mySwiper block-courses"
                      >
                        {dataSet.map((course) => {
                          return (
                            <SwiperSlide className="slide-item">
                              <CourseCard
                                className="slide-item__card"
                                course={course}
                              ></CourseCard>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    );
                  })()
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer coverFooter="true"></Footer>
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
