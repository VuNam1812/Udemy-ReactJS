// @flow
import React, { useState, useEffect, useReducer } from "react";
import { Button } from "../../../../../components";
import courseImg from "../../../../../public/image/course_1.jpg";
import "./style.scss";

const ACTION = {
  UPDATE_PAGINATION: 1,
  UPDATE_LIMIT: 2,
  UPDATE_LISTRENDER: 3,
  INIT_PAGINATION: 4,
  UPDATE_DIRECTACTIVE: 5,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.INIT_PAGINATION:
      let pageInit = new Array(+payload).fill(null).map((index) => ({
        active: "",
      }));
      pageInit[0].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...pageInit],
      };
    case ACTION.UPDATE_PAGINATION:
      let page = new Array(state.pagination.length).fill(null).map(() => ({
        active: "",
      }));
      page[+payload - 1].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...page],
      };
    case ACTION.UPDATE_LIMIT:
      return {
        ...state,
      };
    case ACTION.UPDATE_LISTRENDER:
      return {
        ...state,
        listRender: [
          ...payload.courses.slice(
            (payload.page - 1) * state.limit,
            payload.page * state.limit
          ),
        ],
      };
    case ACTION.UPDATE_DIRECTACTIVE:
      const directActiveList = new Array(2).fill(null).map(() => {
        return "";
      });
      directActiveList[payload] = "active";
      return {
        ...state,
        limit: +payload === 0 ? 8 : 5,
        directList: +payload,
        directActive: [...directActiveList],
      };

    default:
      return state;
  }
};

const initObject = {
  directList: 0,
  pagination: [],
  limit: 8,
  listRender: [],
  directActive: ["active", ""],
};

export const CourseList = ({ courses }) => {
  const [listCourse, dispatch] = useReducer(reducer, initObject);
  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses,
      },
    });
  }, []);

  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses,
      },
    });
  }, [listCourse.limit]);

  const handleLoadPagination = (e) => {
    const index = +e.target.getAttribute("data-id");
    dispatch({
      type: ACTION.UPDATE_PAGINATION,
      payload: +index,
    });
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: +index,
        courses,
      },
    });
  };

  const setupPagenation = (length) => {
    const subPage = length % listCourse.limit > 0 ? 1 : 0;
    const numPage = parseInt(length / listCourse.limit) + subPage;
    dispatch({
      type: ACTION.INIT_PAGINATION,
      payload: numPage,
    });
  };

  const handleUpdateDirectActive = (e) => {
    const direct = +e.currentTarget.getAttribute("data-id");
    dispatch({
      type: ACTION.UPDATE_DIRECTACTIVE,
      payload: direct,
    });
  };

  return (
    <>
      <div className='course-list-header'>
        <div className="pagination-course-list">
          {listCourse.pagination.map((item, index) => {
            return (
              <div
                data-id={index + 1}
                className={`pagination__item ${item.active}`}
                onClick={handleLoadPagination}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="filter-course-list">
          <div
            data-id="0"
            className={`list ${listCourse.directActive[0]}`}
            onClick={handleUpdateDirectActive}
          >
            <i className="fa fa-th-large" aria-hidden="true"></i>
          </div>
          <div
            data-id="1"
            className={`list ${listCourse.directActive[1]}`}
            onClick={handleUpdateDirectActive}
          >
            <i className="fa fa-th-list" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div
        className={`course-lists ${
          listCourse.directList === 0 ? "list-horizontal" : "list-vertical"
        }`}
      >
        {listCourse.listRender.map((item) => {
          return (
            <div className="course-item">
              <div
                className="course-item__image"
                style={{ backgroundImage: `url(${courseImg})` }}
              ></div>
              <div className="block-bottom">
                <div className="block-bottom__text-left">
                  <p className="block-bottom__name">Our top courses</p>
                  <p
                    className={`block-bottom__desc ${
                      listCourse.directList === 0 ? "hidden" : ""
                    }`}
                  >
                    Blend màu có thể hiểu một cách đơn giản là sự hòa trộn các
                    màu sắc, ánh sáng trong một bức ảnh để tạo nên thông điệp
                    độc đáo mà mỗi chúng ta muốn truyền đạt.
                  </p>
                  <p className="block-bottom__teacherName">
                    Giảng viên:{" "}
                    <span className="text--main-color">Vũ Thành Nam</span>
                  </p>
                  <p className="block-bottom__pay-date">
                    Đã thanh toán:{" "}
                    <span className="text--main-color">27/06/2021</span>
                  </p>
                  <div className="block-bottom__more-info">
                    <p>
                      <span className="text--main-color">3</span> Bài học
                    </p>
                    <div
                      className={`rating__stars ${
                        listCourse.directList === 0 ? "hidden" : ""
                      }`}
                    >
                      <p>
                        <span className="text--main-color">4.5</span>/5
                      </p>
                      <div className="stars">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="block-bottom__btn-join btn-smaller btn--color-white btn--hover-vertical-change-color-reverser"
                  content="Tiếp tục học"
                ></Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
