// @flow
import React, { useState, useEffect, useReducer } from "react";
import { Button } from "../../../../../components";
import "./style.scss";
import numeral from "numeral";
import { useHistory, Link } from "react-router-dom";
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

export const CourseList = ({ courses, type }) => {
  const [listCourse, dispatch] = useReducer(reducer, initObject);
  const history = useHistory();
  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses,
      },
    });
  }, [courses]);

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
      payload: numPage ? numPage : 1,
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
      <div className="course-list-header">
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
        {listCourse.listRender.map((course) => {
          return (
            <div className="course-item">
              {course.srcImage && (
                <div
                  className="course-item__image"
                  style={{
                    backgroundImage: `url("http://localhost:3030/${course.srcImage.replaceAll(
                      "\\",
                      "/"
                    )}")`,
                  }}
                ></div>
              )}

              <div className="block-bottom">
                <div className="block-bottom__text-left">
                  <Link
                    to={`/courses/${course.id}`}
                    className="block-bottom__name"
                  >
                    {course.courName}
                  </Link>
                  <div className="block-bottom__block-flex">
                    <p
                      className={`block-bottom__desc ${
                        listCourse.directList === 0 ? "hidden" : ""
                      }`}
                    >
                      {course.tinyDes}
                    </p>
                    <p className="block-bottom__teacherName">
                      Giảng viên:{" "}
                      <Link
                        to={`/teachers/${course.id_owner}`}
                        className="text--main-color"
                      >
                        {course.teacherName}
                      </Link>
                    </p>
                    {type === "join" ? (
                      <p className="block-bottom__pay-date">
                        Đã thanh toán:{" "}
                        <span className="text--main-color">
                          {new Date(course.payAt).toLocaleDateString()}
                        </span>
                      </p>
                    ) : (
                      <p className="block-bottom__pay-date">
                        Đã ghi danh:{" "}
                        <span className="text--main-color">
                          {numeral(course.joinerCount).format("0,0")}
                        </span>{" "}
                        học viên
                      </p>
                    )}
                    <div className="block-bottom__more-info">
                      <p>
                        <span className="text--main-color">
                          {course.lectureCount}
                        </span>{" "}
                        Bài học
                      </p>
                      <div
                        className={`rating__stars ${
                          listCourse.directList === 0 ? "hidden" : ""
                        }`}
                      >
                        <p>
                          <span className="text--main-color">
                            {numeral(course.rate).format("0.0")}
                          </span>
                          /5
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
                </div>
                {type === "join" ? (
                  <Button
                    className="block-bottom__btn-join btn-smaller btn--color-white btn--hover-vertical-change-color-reverser"
                    content="Tiếp tục học"
                    onClick={() => {
                      history.push(
                        `/lessions/${course.id}/${course.firstLecture}`
                      );
                    }}
                  ></Button>
                ) : (
                  <>
                    <Button
                      className="block-bottom__btn-join btn-smaller  btn--hover-vertical-change-color"
                      content="Ghi danh"
                      onClick={() => {
                        history.push(`/payment/${course.id}`);
                      }}
                    ></Button>
                    <div className="block-bottom__btn-remove">
                      <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
