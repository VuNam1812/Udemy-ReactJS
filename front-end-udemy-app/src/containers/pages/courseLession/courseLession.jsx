// @flow
import React, { useReducer, useEffect } from "react";

import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Expander } from "../../../components";
import "./style.scss";

import { handleCourseLession } from "./middleware/handleCourseLessions";
import { reducer, LESSION_ACTION } from "./reducer/reducer";
import { useParams } from "react-router";

import { InfoCourse, LessionVideos, VideoPlayer } from "./pageItem";

const initData = {
  course: {},
  lessions: [],
  active: -1,
  video: {},
};

export const CourseLession = (props) => {
  const [store_lecture, dispatch] = useReducer(reducer, initData);
  const params = useParams();
  useEffect(() => {
    (async () => {
      dispatch({
        type: LESSION_ACTION.UPDATE_ACTIVE,
        payload: +params.lessionId,
      });
      await handleCourseLession.loadCourse(params, dispatch);
      await handleCourseLession.loadLessions(params, dispatch);
    })();
  }, [params.courId]);

  useEffect(() => {
    console.log(store_lecture.active);
  }, [store_lecture.active]);

  useEffect(() => {
    (async () => {
      await handleCourseLession.loadVideo(
        params,
        store_lecture.lessions,
        dispatch
      );
    })();
  }, [store_lecture.active, store_lecture.lessions]);

  return (
    <div className="course-lession">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="lession-content">
        <div className="right-content">
          <VideoPlayer
            className="right-content__video"
            video={store_lecture.video}
          ></VideoPlayer>
          <InfoCourse course={store_lecture.course}></InfoCourse>
        </div>
        <div className="left-content">
          <LessionVideos
            active={store_lecture.active}
            lessions={store_lecture.lessions}
            dispatch={dispatch}
          ></LessionVideos>
        </div>
      </div>
    </div>
  );
};
