// @flow
import React, { useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Editor } from "react-draft-wysiwyg";
import {
  Button,
  NavTab,
  InputWithLabel,
  Expander,
} from "../../../../../components";
import courseImage from "../../../../../public/image/course_1.jpg";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
export const CoursesOwner = (props) => {
  const [activeFilter, setActiveFilter] = useState(-1);
  const [stepActive, setStepActive] = useState(2);
  const [fullDescText, setFullDescText] = useState("");
  SwiperCore.use([Mousewheel, Pagination]);
  return (
    <div className={`courses-owner ${props.className}`}>
      <div
        className={`courses-owner__cover ${
          stepActive === 1 ? "active-view-courses" : "active-edit-course"
        }`}
      >
        <div className="courses-owner__view-courses">
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
                    onClick={() => {
                      setStepActive(2);
                    }}
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
                                style={{
                                  backgroundImage: `url(${courseImage})`,
                                }}
                              ></div>
                              <div className="slide-item__body">
                                <p className="slide-item__body-title">
                                  The Complete Digital Marketing Course - 12
                                  Courses in 1
                                </p>
                                <div className="slide-item__body-time">
                                  <p>
                                    Đăng tải:{" "}
                                    <span className="text-main">
                                      26/05/2021
                                    </span>
                                  </p>
                                  <p>
                                    Cập nhật lần cuối:{" "}
                                    <span className="text-main">
                                      26/05/2021
                                    </span>
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
                                      <span className="text-main">3</span>{" "}
                                      videos
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
        <div className="courses-owner__edit-course">
          <NavTab
            className="tabs-content--none-shadow"
            headers={["Thông tin khóa học", "Bài giảng"]}
            blocks={[
              <div className="course-info">
                <div className="course-info__main-form">
                  <div className="course-info__form-input">
                    <InputWithLabel
                      inputClassName="form-item-view-main__input"
                      name="courseName"
                      placeHolder="Tên khóa học"
                      labelName="Tên khóa học"
                      className="form-item-view-main input-horizontal input--shadow"
                    ></InputWithLabel>
                    <InputWithLabel
                      inputClassName="form-item-view-main__input"
                      name="courseName"
                      placeHolder="Lĩnh vực"
                      labelName="Lĩnh vực"
                      className="form-item-view-main input-horizontal input--shadow"
                    ></InputWithLabel>
                    <InputWithLabel
                      inputClassName="form-item-view-main__input"
                      name="courseName"
                      placeHolder="Tình trạng"
                      labelName="Tình trạng"
                      className="form-item-view-main input-horizontal input--shadow"
                    ></InputWithLabel>
                    <InputWithLabel
                      inputClassName="form-item-view-main__input"
                      name="price"
                      placeHolder="Học phí"
                      labelName="Học phí"
                      className="form-item-view-main input-horizontal input--shadow"
                    ></InputWithLabel>
                    <InputWithLabel
                      inputClassName="form-item-view-main__input"
                      name="miniDesc"
                      placeHolder="Mô tả"
                      labelName="Mô tả ngắn"
                      className="form-item-view-main input-horizontal input--shadow"
                    ></InputWithLabel>
                  </div>
                  <div className="course-info__image"></div>
                </div>
                <div className="course-info__sub-form">
                  <div className="course-info__full-desc">
                    <div className="full-desc__editor">
                      <Editor
                        editorState={fullDescText}
                        toolbarClassName="editor__toolbarClassName"
                        wrapperClassName="editor__wrapperClassName"
                        editorClassName="editor__ClassName"
                        placeholder="Mô tả chi tiết"
                        onEditorStateChange={(text) => {
                          setFullDescText(text);
                        }}
                      />
                    </div>
                  </div>
                  <div className="course-info__btn-group">
                    <Button
                      onClick={() => {
                        setStepActive(1);
                      }}
                      className="btn-smaller"
                      content="Cancel"
                    ></Button>
                    <Button className="btn-smaller" content="Save"></Button>
                  </div>
                </div>
              </div>,
              <div className="lession-info">
                <Button
                  className="lession-info__add-btn btn-smaller"
                  content="Thêm mới"
                ></Button>
                <div className="lession-info__content">
                  <Expander
                    className="lession-info__expander-lecture"
                    overideRightComponent={
                      <div className="expander-left-control">
                        <div className="left-control__btn bg--success">
                          <i className="icon fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <div className="left-control__btn bg--info">
                          <i
                            className="icon fa fa-pencil"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="left-control__btn bg--danger">
                          <i
                            className="icon fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    }
                    title="Introdution"
                  ></Expander>
                  <Expander
                    className="lession-info__expander-lecture"
                    overideRightComponent={
                      <div className="expander-left-control">
                        <div className="left-control__btn bg--success">
                          <i className="icon fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <div className="left-control__btn bg--info">
                          <i
                            className="icon fa fa-pencil"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="left-control__btn bg--danger">
                          <i
                            className="icon fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    }
                    title="Introdution"
                  ></Expander>
                  <Expander
                    className="lession-info__expander-lecture"
                    overideRightComponent={
                      <div className="expander-left-control">
                        <div className="left-control__btn bg--success">
                          <i className="icon fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <div className="left-control__btn bg--info">
                          <i
                            className="icon fa fa-pencil"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="left-control__btn bg--danger">
                          <i
                            className="icon fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    }
                    title="Introdution"
                  ></Expander>
                  <Expander
                    className="lession-info__expander-lecture"
                    overideRightComponent={
                      <div className="expander-left-control">
                        <div className="left-control__btn bg--success">
                          <i className="icon fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <div className="left-control__btn bg--info">
                          <i
                            className="icon fa fa-pencil"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="left-control__btn bg--danger">
                          <i
                            className="icon fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    }
                    title="Introdution"
                  ></Expander>
                </div>
              </div>,
            ]}
          ></NavTab>
        </div>
      </div>
    </div>
  );
};

const dataSet = new Array(10).fill("");
const dataSet_characters = new Array(27).fill().map((item, index) => {
  return index === 0 ? (
    <i className="fa fa-globe" aria-hidden="true"></i>
  ) : (
    String.fromCharCode(64 + index)
  );
});
