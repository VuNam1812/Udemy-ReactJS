// @flow
import React, { useRef } from "react";

import {
  NavTab,
  InputWithLabel,
  Expander,
  Button,
  RadioButton,
} from "../../../../../../components";
import { COURSES_OWNER_ACTION } from "../reducer/reducer";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import "./style.scss";
import Swal from "sweetalert2";
import { handleCourseOwner } from "../middleware/handleCourseOwner";
export const EditCourse = ({ dispatch, courseOwnerDispatch }) => {
  const { register } = useForm();
  const file = useRef();
  const submit = useRef();

  const handleChangeCourseImage = (e) => {
    if (e.target.files.length === 0) return;
  };

  const handleCancelEdit = async () => {
    await handleCourseOwner.checkCancel();
    courseOwnerDispatch({
      type: COURSES_OWNER_ACTION.UPDATE_ACTIVE,
      payload: 1,
    });
  };

  return (
    <div className="edit-course">
      <NavTab
        className="tabs-content--none-shadow"
        headers={["Thông tin khóa học", "Bài giảng"]}
        blocks={[
          <div className="course-info">
            <div className="course-info__main-form">
              <div className="course-info__form-input">
                <InputWithLabel
                  inputClassName="form-item-view-main__input"
                  name="courseName"
                  placeHolder="Tên khóa học"
                  labelName="Tên khóa học"
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <InputWithLabel
                  inputClassName="form-item-view-main__input"
                  name="courseName"
                  placeHolder="Lĩnh vực"
                  labelName="Lĩnh vực"
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <InputWithLabel
                  inputClassName="form-item-view-main__input input--unit"
                  name="price"
                  placeHolder="Học phí"
                  labelName="Học phí"
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <InputWithLabel
                  inputClassName="form-item-view-main__input"
                  name="miniDesc"
                  placeHolder="Mô tả"
                  labelName="Mô tả ngắn"
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <div className="form-item-view-main__radio">
                  <label className="radio__label">Tình trạng</label>
                  <RadioButton
                    onChange={(e) => {}}
                    value={-1}
                    className="radio__input"
                    items={["Hoàn Thành", "Chưa Hoàn Thành"]}
                  ></RadioButton>
                </div>
              </div>
              <div
                className="course-info__image"
                style={{ backgroundImage: `url("http://localhost:3030/")` }}
              >
                <div
                  className="image__change-photo"
                  onClick={() => {
                    file.current.click();
                  }}
                >
                  <i className="icon fa fa-camera" aria-hidden="true"></i>
                  <input
                    type="file"
                    ref={file}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChangeCourseImage}
                    hidden
                  ></input>
                </div>
              </div>
            </div>
            <div className="course-info__sub-form">
              <div className="course-info__full-desc">
                <div className="full-desc__editor">
                  <Editor
                    editorState={""}
                    toolbarClassName="editor__toolbarClassName"
                    wrapperClassName="editor__wrapperClassName"
                    editorClassName="editor__ClassName"
                    placeholder="Mô tả chi tiết"
                    onEditorStateChange={(text) => {}}
                  />
                </div>
              </div>
              <div className="course-info__btn-group">
                <Button
                  onClick={handleCancelEdit}
                  className="btn-smaller btn--color-white"
                  content="Quay lại"
                ></Button>
                <Button
                  className="btn-smaller btn--hover-change-color"
                  content="Cập nhật"
                ></Button>
              </div>
            </div>
          </div>,
          <div className="lession-info">
            <Button
              className="lession-info__add-btn btn-smaller"
              content="Thêm mới"
            ></Button>
            <div className="lession-info__content">
              <Expander
                className="lession-info__expander-lecture"
                overideRightComponent={
                  <div className="expander-left-control">
                    <div className="left-control__btn bg--success">
                      <i className="icon fa fa-plus" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--info">
                      <i className="icon fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--danger">
                      <i className="icon fa fa-trash" aria-hidden="true"></i>
                    </div>
                  </div>
                }
                title="Introdution"
              ></Expander>
              <Expander
                className="lession-info__expander-lecture"
                overideRightComponent={
                  <div className="expander-left-control">
                    <div className="left-control__btn bg--success">
                      <i className="icon fa fa-plus" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--info">
                      <i className="icon fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--danger">
                      <i className="icon fa fa-trash" aria-hidden="true"></i>
                    </div>
                  </div>
                }
                title="Introdution"
              ></Expander>
              <Expander
                className="lession-info__expander-lecture"
                overideRightComponent={
                  <div className="expander-left-control">
                    <div className="left-control__btn bg--success">
                      <i className="icon fa fa-plus" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--info">
                      <i className="icon fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--danger">
                      <i className="icon fa fa-trash" aria-hidden="true"></i>
                    </div>
                  </div>
                }
                title="Introdution"
              ></Expander>
              <Expander
                className="lession-info__expander-lecture"
                overideRightComponent={
                  <div className="expander-left-control">
                    <div className="left-control__btn bg--success">
                      <i className="icon fa fa-plus" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--info">
                      <i className="icon fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <div className="left-control__btn bg--danger">
                      <i className="icon fa fa-trash" aria-hidden="true"></i>
                    </div>
                  </div>
                }
                title="Introdution"
              ></Expander>
            </div>
          </div>,
        ]}
      ></NavTab>
    </div>
  );
};
