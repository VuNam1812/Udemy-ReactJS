// @flow
import React from "react";
import "./style.scss";
import numeral from "numeral";
import { Button } from "../../../../components";
import srcImage from "../../../../public/image/course_1.jpg";

import { PAY_ACTION } from "../reducer/reducer";
import Swal from "sweetalert2";
export const ConfirmCourse = (props) => {
  const handlePayment = () => {
    Swal.fire({
      title: "Payment...",
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          props.dispatch({
            type: PAY_ACTION.UPDATE_ACTIVE,
            payload: 2,
          });

          Swal.close();
        }, 1000);
      },
    });
  };

  return (
    <div className="confirm-course">
      <div className="info-payment">
        <p className="info-payment__title">Thông tin Khóa học</p>
        <div className="info-payment__course-pay">
          <div
            className="course-pay__image"
            style={{ backgroundImage: `url(${srcImage})` }}
          ></div>
          <div className="course-pay__body-content">
            <p className="body-content__title-course">
              Facebook Ads & Facebook Marketing MASTERY 2021 | Coursenvy ®
            </p>
            <p className="body-content__teacher-name">
              Giảng viên: <span>Hoàng phúc Photo</span>
            </p>
            <p className="body-content__price-course">
              Học phí: <span>{numeral(1200000).format("0,0")} VND</span>
            </p>
          </div>
        </div>
        <p className="info-payment__noticed">
          * Khóa học sẽ được kích hoạt khi thanh toán thành công
        </p>
      </div>
      <div className="user-payment">
        <p className="user-payment__title">Thông tin khách hàng</p>
        <div className="user-payment__info">
          <p className="info__item">
            <i className="icon fa fa-user-circle-o" aria-hidden="true"></i> Vũ
            Thành Nam
          </p>
          <p className="info__item">
            <i className="icon fa fa-envelope" aria-hidden="true"></i>{" "}
            vunam1218@gmail.com
          </p>
          <p className="info__item">
            <i className="icon fa fa-phone-square" aria-hidden="true"></i> 0942
            603 267
          </p>
        </div>
        <Button
          onClick={handlePayment}
          className="user-payment__btn-pay btn-smaller btn--color-white"
          content="Thanh toán"
        ></Button>
      </div>
    </div>
  );
};
