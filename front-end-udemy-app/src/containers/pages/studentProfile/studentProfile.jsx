// @flow
import * as React from "react";
import "./style.scss";
import { StudentInfo, CourseList } from "./itemInfo";
import { NavTab } from "../../../components";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import { InComing } from "../../incoming/inComing";
import avartar from "../../../public/image/teacher_1.jpg";
export const StudentProfile = (props) => {
  return (
    <>
      <HeaderUpper></HeaderUpper>
      <InComing></InComing>
      <div className="student-profile">
        <div className="wrap">
          <StudentInfo info={infoStudent}></StudentInfo>
          <div className="student-profile__course-info">
            <NavTab
              className="tabs-content--none-shadow"
              headers={["Khóa đang học", "Khóa yêu thích"]}
              blocks={[
                <CourseList courses={dataSet}></CourseList>,
                <div></div>,
              ]}
            ></NavTab>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

const infoStudent = {
  name: 'Vũ Thành Nam',
  email: 'vunam1218@gmail.com',
  role: 'Học viên',
  avatar: avartar,
}

const dataSet = new Array(12).fill("");
