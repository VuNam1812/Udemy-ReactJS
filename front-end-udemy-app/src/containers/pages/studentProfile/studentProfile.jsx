// @flow
import React, { useState } from "react";
import "./style.scss";
import { Modal } from "../../../components";
import {
  StudentInfo,
  CourseList,
  EditProfile,
  ChangePasswordForm,
} from "./itemInfo";
import { NavTab } from "../../../components";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import { InComing } from "../../incoming/inComing";
import avartar from "../../../public/image/teacher_1.png";

const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};

export const StudentProfile = (props) => {
  const [step, setStep] = useState(2);
  const [modalState, setModalState] = useState(enumState.HIDDEN);

  const handleCloseModal = () => {
    setModalState(enumState.CLOSE);
  };
  const handleOpenModal = () => {
    setModalState(enumState.VISIBLE);
  };
  return (
    <>
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <InComing></InComing>
      <div className="student-profile">
        <div className="wrap">
          <StudentInfo setStep={setStep} info={infoStudent}></StudentInfo>
          <div className="student-profile__cover">
            <div
              className={`student-profile__course-info ${
                step === 1 ? "" : "active-tabs-edit"
              }`}
            >
              <NavTab
                className="tabs-content--none-shadow student-profile__tabs"
                headers={["Khóa đang học", "Khóa yêu thích"]}
                blocks={[
                  <CourseList courses={dataSet}></CourseList>,
                  <CourseList courses={dataSet}></CourseList>,
                ]}
              ></NavTab>
              <EditProfile
                handleOpenModal={handleOpenModal}
                setStep={setStep}
                className="student-profile__edit"
              ></EditProfile>
            </div>
          </div>
        </div>
      </div>
      <Modal state={modalState} onClickOverlay={handleCloseModal}>
        <ChangePasswordForm></ChangePasswordForm>
      </Modal>
      <Footer></Footer>
    </>
  );
};

const infoStudent = {
  name: "Vũ Thành Nam",
  email: "vunam1218@gmail.com",
  role: "Học viên",
  avatar: avartar,
};

const dataSet = new Array(5).fill("");
