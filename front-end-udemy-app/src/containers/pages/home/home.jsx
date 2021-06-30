// @flow
import * as React from "react";
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
export const Home = (props) => {
  return (
    <div className="home">
      <Header></Header>
      <Intro></Intro>
      <AboutUs></AboutUs>
      <TopCourses></TopCourses>
      <ImageSection></ImageSection>
      <Achievements></Achievements>
      <NewCourses></NewCourses>
      <ViewCourses></ViewCourses>
      <TopCategory></TopCategory>
      <ReadyJoin></ReadyJoin>
      <Footer></Footer>
    </div>
  );
};
