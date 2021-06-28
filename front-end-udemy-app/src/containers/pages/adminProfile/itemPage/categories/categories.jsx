// @flow
import React from "react";
import "./style.scss";
import { Button } from "../../../../../components";
import cateImage from "../../../../../public/image/course_1.jpg";
export const Categories = (props) => {
  return (
    <div className="categories-page">
      <div className="categories-page__group">
        <Button
          content="Thêm danh mục"
          className="btn-smaller group__btn-add"
        ></Button>
        {dataSet.map((item, index) => {
          return (
            <div key={index} data-id={index} className="group-item">
              CNTT & Phần mềm
            </div>
          );
        })}
      </div>
      <div className="categories-page__content">
        <div className="content__main-category">
          <div
            className="main-category__image"
            style={{ backgroundImage: `url(${cateImage})` }}
          ></div>
          <div className="main-category__info">
            <div className="block-flex">
              <p className="info__name">CNTT & Phần mềm</p>
              <div className="info__edit-btn">
                <i
                  className="icon fa fa-pencil-square fa-lg"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <p className="info__count">12 danh mục</p>
          </div>
          <div className="main-category__delete-btn">
            <i className="icon fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
        <p className="content__sub-category-title">Danh mục con</p>
        <div className="content__sub-category-group">
          {dataSet_1.map((item) => {
            return (
              <div className="content__main-category sub-category-group__item">
                <div
                  className="main-category__image sub-category-group__item-image"
                  style={{ backgroundImage: `url(${cateImage})` }}
                ></div>
                <div className="main-category__info">
                  <div className="block-flex">
                    <p className="sub-category-group__item-name info__name">
                      CNTT & Phần mềm
                    </p>
                    <div className="info__edit-btn">
                      <i
                        className="icon fa fa-pencil-square fa-lg"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="main-category__delete-btn">
                  <i className="icon fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const dataSet = new Array(6).fill("");
const dataSet_1 = new Array(5).fill("");
