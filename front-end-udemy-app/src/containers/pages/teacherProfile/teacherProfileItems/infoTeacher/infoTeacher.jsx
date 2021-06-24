// @flow
import React, { useState } from "react";
import imageTeacher from "../../../../../public/image/teacher_2.png";
import { Button, NavTab } from "../../../../../components";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.scss";
export const InfoTeacher = (props) => {
  const [introText, setIntroText] = useState("");
  const [techniqueText, setTechniqueText] = useState("");

  return (
    <div className={`info-teacher ${props.className}`}>
      <div className="left-block">
        <div
          className="left-block__avatar"
          style={{
            backgroundImage: `url(${imageTeacher})`,
          }}
        >
          {" "}
        </div>

        <div className="cover-block-left">
          <div className="left-block__form-group">
            <div className="form-item">
              <label className="form-item__label">
                Name:{" "}
                <input
                  value="Vũ Thành Nam"
                  className="form-item__input"
                ></input>
              </label>
              <label className="form-item__label">
                Chuyên môn:{" "}
                <input
                  value="Design website & UI Testing"
                  className="form-item__input"
                ></input>
              </label>
            </div>
            <div className="form-item">
              <label className="form-item__label">
                Email:{" "}
                <input
                  value="vunam1218@gmail.com"
                  className="form-item__input"
                ></input>
              </label>
              <label className="form-item__label">
                SDT:{" "}
                <input value="0989989989" className="form-item__input"></input>
              </label>
            </div>
          </div>
          <div className="left-block__btn ">
            <Button className="btn-smaller" content="Save"></Button>
          </div>
        </div>
      </div>
      <div className="right-block">
        <NavTab
          className="tabs-style--fill right-block__tabs tabs-content--flex-height-full"
          headers={["Giới thiệu", "Kỹ năng"]}
          blocks={[
            <div className="tabs__text-area">
              <Editor
                editorState={introText}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                placeholder="Giới thiệu bản thân"
                onEditorStateChange={(text) => {
                  setIntroText(text);
                }}
              />
            </div>,
            <div className="tabs__text-area">
              <Editor
                editorState={techniqueText}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                placeholder="Kỹ năng bản thân"
                onEditorStateChange={(text) => {
                  setTechniqueText(text);
                }}
              />
            </div>,
          ]}
        ></NavTab>
      </div>
    </div>
  );
};
