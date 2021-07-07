// @flow
import * as React from "react";
import { Expander } from "../../../../../components";
import "./style.scss";
export const Videos = ({ lessions }) => {
  return (
    <div className="videos">
      {lessions.length &&
        lessions.map((lession) => {
          return (
            <Expander className="" title={lession.name}>
              {lession.lectures.length ? (
                lession.lectures.map((lecture, index) => {
                  return (
                    <div
                      className={`lecture-video ${
                        lecture.isCanPreview ? "" : "disabled"
                      }`}
                    >
                      <p className="lecture-video__name">
                        Bài {index}: {lecture.name}
                      </p>
                      <p className="lecture-video__duration">
                        {new Date(1000 * +lecture.duration)
                          .toISOString()
                          .substr(11, 8)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className={`lecture-video disabled`}>
                  <p className="lecture-video__name">
                    ( Hiện chưa có bài giảng )
                  </p>
                </div>
              )}
            </Expander>
          );
        })}
    </div>
  );
};
