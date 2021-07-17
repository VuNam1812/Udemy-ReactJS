// @flow
import React, { useReducer, useEffect } from "react";
import { Header } from "../../header/header";
import { Intro } from "./intro/intro";
import { AboutUs } from "./aboutUs/aboutUs";
import { TopCourses } from "./topCourses/topCourses";
import { ImageSection } from "./imageSection/imageSection";
import { Achievements } from "./achievements/achievements";
import { NewCourses } from "./newCourses/newCourses";
import { ViewCourses } from "./viewCourses/viewCourses";
import { TopCategory } from "./topCategory/topCategory";
import { ReadyJoin } from "./readyJoin/readyJoin";
import { Footer } from "../../footer/footer";

import categoryApi from "../../../api/categoryAPI";
import courseApi from "../../../api/courseAPI";
import { reducer, HOME_ACTION } from "./reducer/reducer";

import $ from "jquery";

const initData = {
  topRate: [],
  topView: [],
  topNew: [],
  topCats: [],
};

export const Home = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);

  useEffect(() => {
    (async () => {
      const courses_filter = await courseApi.getAll({
        filter: ["topRate", "topView", "topNew"],
      });
      const category_filter = await categoryApi.getAll({
        filter: "topJoin",
      });

      dispatch({
        type: HOME_ACTION.INIT_DATA,
        payload: courses_filter.data,
      });
      dispatch({
        type: HOME_ACTION.UPDATE_TOPCAT,
        payload: category_filter.data,
      });
    })();

    $("html,body").animate({ scrollTop: 0 }, 500);
  }, []);

  return (
    <div className="home">
      <Header></Header>
      <Intro></Intro>
      <AboutUs></AboutUs>
      <TopCourses courses={store.topRate}></TopCourses>
      <ImageSection></ImageSection>
      <Achievements></Achievements>
      <NewCourses courses={store.topNew}></NewCourses>
      <ViewCourses courses={store.topView}></ViewCourses>
      <TopCategory cats={store.topCats}></TopCategory>
      <ReadyJoin></ReadyJoin>
      <Footer></Footer>
    </div>
  );
};
