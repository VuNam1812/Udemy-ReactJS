// @flow
import React from "react";
import "./style.scss";

import { Button } from "../../../../../components";
import teacherImage from "../../../../../public/image/teacher_1.png";
import numeral from "numeral";
export const Feedback = ({ rate, feedbacks }) => {
  return (
    <div className="feedback">
      <div className="feedback__header">
        <div className="feedback__header-summary">
          <p className="feedback__header-summary-rate">
            {numeral(rate).format("0.0")}
            <span> / 5</span>
          </p>
          <p className="feedback__header-summary-feedback">
            {feedbacks.feedbacks &&
              `( ${numeral(feedbacks.feedbacks.length).format(
                "0,0"
              )} bình chọn )`}
          </p>
        </div>
        <div className="feedback__header-detail">
          {feedbacks.rate &&
            feedbacks.rate.map((rate, index) => {
              return (
                <div className="rate-item">
                  <p className="rate-item__index">
                    {index + 1}{" "}
                    <i className="icon fa fa-star" aria-hidden="true"></i>
                  </p>
                  <div className="rate-item__rate-bar">
                    <div
                      className="loading-bar"
                      style={{ width: `${rate.percent}%` }}
                    ></div>
                  </div>
                  <div className="group-detail">
                    <p className="rate-item__feedback"> ({rate.count})</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="feedback__body">
        <Button
          className="feedback__body-add-btn btn--color-white"
          content="Thêm bình luận"
        ></Button>
        <div className="feedback__body-group">
          {(feedbacks.feedbacks) && ((feedbacks.feedbacks.length === 0) ? (
            <p className="feedback__body-empty">
              (Hiện chưa có bình luận cho khóa học)
            </p>
          ) : (
            feedbacks.feedbacks.map((feedback) => {
              return (
                <div className="item">
                  <div className="item-user">
                    <div className="item-user__image">
                      <img src={teacherImage}></img>
                    </div>
                    <p className="item-user__name">{`${feedback.user.firstName} ${feedback.user.lastName}`}</p>
                  </div>

                  <div className="item-feedback-info">
                    <div className="item-feedback-info__header">
                      <div
                        className={`item-feedback-info__header-stars rate--${feedback.rate}`}
                      >
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                      </div>
                      <div className="group-info">
                        <p className="item-feedback-info__header-time">
                          {new Date(feedback.createAt).toLocaleDateString()}
                        </p>
                        <div className="item-feedback-info__header-reaction">
                          <span className="like">
                            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                          </span>
                          <span className="dislike">
                            <i
                              class="fa fa-thumbs-o-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <p className="report">Báo cáo</p>
                        </div>
                      </div>
                    </div>
                    <p className="item-feedback-info__text">
                      {feedback.content}
                    </p>
                  </div>
                </div>
              );
            })
          ))}
        </div>
          {(feedbacks.feedbacks) && (feedbacks.feedbacks.length !== 0 && (
            <Button
              className="feedback__body-loadmore-btn btn--none"
              content="----- Tải thêm -----"
            ></Button>
          ))}
      </div>
    </div>
  );
};

const dataStar = [
  { feedbacks: "10.000", percent: 10 },
  { feedbacks: "20.000", percent: 35 },
  { feedbacks: "30.000", percent: 80 },
  { feedbacks: "40.000", percent: 52 },
  { feedbacks: "50.000", percent: 100 },
];
