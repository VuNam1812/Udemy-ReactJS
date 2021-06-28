// @flow
import React, { useState, useEffect, useReducer } from "react";
import { Select } from "../../../../../components";
import "./style.scss";
import courseImage from "../../../../../public/image/course_1.jpg";

const ACTION = {
  UPDATE_PAGINATION: 1,
  UPDATE_LISTRENDER: 3,
  INIT_PAGINATION: 4,
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

    default:
      return state;
  }
};

const initObject = {
  pagination: [],
  limit: 8,
  listRender: [],
};

export const Courses = (props) => {
  const [filterSelected, setFilterSelected] = useState(-1);
  const [subfilterCate, setSubfilterCate] = useState([]);
  const [listCourse, dispatch] = useReducer(reducer, initObject);

  useEffect(() => {
    setupPagenation(dataSet.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
       courses:  dataSet,
      },
    });
  }, []);

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
        courses: dataSet,
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
  return (
    <div className="courses">
      <div className="courses__filter">
        <Select
          value={filterSelected}
          onChange={(e) => {
            setFilterSelected(+e.target.value);
          }}
          defaultSelected="--- Bộ lọc ---"
          data={[
            "--- None ---",
            "--- Lọc theo giảng viên ---",
            "--- Lọc theo danh mục ---",
          ]}
          className="select--bottom select--shadow filter__main"
        ></Select>
        <div className="filter__sub-filter">
          {filterSelected === 1 && (
            <div className="sub-filter__teacher">
              <Select
                defaultSelected="--- Chọn Giảng viên ---"
                className="select--bottom select--shadow"
              ></Select>
            </div>
          )}
          {filterSelected === 2 && (
            <div className="sub-filter__categories">
              <Select
                onChange={(e) => {
                  setSubfilterCate(+e.target.value === 0 ? ["", "", ""] : []);
                }}
                data={["--- CNTT và Phần Mềm ---", "--- Kinh doanh ---"]}
                defaultSelected="--- Chọn danh mục ---"
                className="select--bottom select--shadow sub-filter__categories-item"
              ></Select>
              {subfilterCate.length > 0 && (
                <Select
                  defaultSelected="--- Chọn danh mục ---"
                  className="select--bottom select--shadow sub-filter__categories-item"
                ></Select>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="courses__pagination">
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
      <div className="courses__group">
        {listCourse.listRender.map((item, index) => {
          return (
            <div className="courses__item">
              <div
                className="item__image"
                style={{ backgroundImage: `url(${courseImage})` }}
              ></div>
              <div className="item__info-course">
                <div className="info-course__header">
                  <div className="info-course__name">Our top course</div>
                  <div>
                    <i
                      class="icon icon-success fa fa-unlock-alt fa-2x"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="info-course__categories">
                  CNTT & Phần mềm - Lập trình web
                </div>
                <div className="info-course__teacher">
                  Giảng viên: <span className="text-main"> Vũ Thành Nam</span>
                </div>
                <div className="info--block-flex">
                  <div className="info-course__lecture">
                    <span className="text-main">12</span> Bài giảng
                  </div>
                  <div className="info-course__price">
                    <span className="text-danger">160,000 VND</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const dataSet = new Array(30).fill(null).map(() => "");
