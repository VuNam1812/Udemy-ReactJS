// @flow
import * as React from "react";
import { NavTab, Button } from "../../../../../components";
import teacherImage from "../../../../../public/image/teacher_1.png";
import "./style.scss";
export const Accounts = (propss) => {
  return (
    <div className="account-manager">
      <NavTab
        headers={["Giảng viên", "Học viên"]}
        blocks={[
          <div className="accounts-list">
            <div className="flex-block">
              <p className="accounts-list__title">Danh sách giảng viên</p>
              <Button
                content="Thêm giảng viên"
                className="btn-smaller accounts-list__add-btn"
              ></Button>
            </div>
            <div className="accounts-list__group">
              {dataSet_Teachers.map((item) => {
                return (
                  <div className={`accounts-group__item ${item}`}>
                    <div
                      className="item__image"
                      style={{ backgroundImage: `url(${teacherImage})` }}
                    ></div>
                    <div className="item__info">
                      <p className="item__info-name">Vũ Thành Nam</p>
                      <p className="item__info-courses">
                        <span>12</span> khóa học
                      </p>
                    </div>
                    <div className="item__btn-lock">
                      <i
                        className={`icon fa fa-${
                          item === "disable" ? "lock" : "unlock-alt"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>,
          <div className="accounts-list">
            <p className="accounts-list__title">Danh sách học viên</p>
            <div className="accounts-list__group">
              {dataSet_Students.map((item) => {
                return (
                  <div className={`accounts-group__item ${item}`}>
                    <div
                      className="item__image"
                      style={{ backgroundImage: `url(${teacherImage})` }}
                    ></div>
                    <div className="item__info">
                      <p className="item__info-name">Vũ Thành Nam</p>
                      <p className="item__info-courses">
                        <span>12</span> khóa học
                      </p>
                    </div>
                    <div className="item__btn-lock">
                            <i
                                className={`icon fa fa-${item === 'disable' ? 'lock' : 'unlock-alt'}`}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>,
        ]}
      ></NavTab>
    </div>
  );
};

const dataSet_Teachers = new Array(1).fill("").map((item, index) => {
  return (index + 1) % 3 === 0 ? "disable" : "";
});
const dataSet_Students = new Array(7).fill("").map((item, index) => {
  return (index + 1) % 3 === 0 ? "disable" : "";
});
