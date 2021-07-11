// @flow
import React, { useEffect, useState } from "react";
import { Button, FieldText, RadioButton } from "../../../../../components";
import "./style.scss";
import { STUDENT_PROFILE_ACTION } from "../../reducer/reducer";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { handleEditProfile } from "../../middleware/handleEditProfile";

export const EditProfile = ({
  authDispatch,
  error,
  info,
  dispatch,
  className,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [gender, setGender] = useState(info.gender);
  const submit = useRef();
  const form = useRef();
  const onSubmitLogin = async (data, e) => {
    if (handleEditProfile.checkAllField(data, dispatch)) return;
    if ((await handleEditProfile.checkEmailExist(data, dispatch))) return;
    await handleEditProfile.updateAccount(info, data, dispatch, authDispatch);

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: 1,
    });
  };

  const handleCancelBtn = async () => {
    const result = await handleEditProfile.confirmCancel();
    if (!result) {
      form.current.reset();
      setGender(info.gender);
    } else {
      if (handleEditProfile.checkAllField(getValues(), dispatch)) return;
      await handleEditProfile.updateAccount(
        info,
        getValues(),
        dispatch,
        authDispatch
      );
    }

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: 1,
    });
  };

  useEffect(() => {
    ["firstName", "lastName", "phone", "email", "gender"].map((item) => {
      setValue(`${item}`, info[item] ? info[item] : "");
    });

    setGender(+info.gender);
  }, [info]);

  return (
    <div className={`edit-profile ${className}`}>
      <div className="edit-profile__header">Thông tin tài khoản</div>
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmitLogin)}
        className="edit-profile__form-group"
      >
        <div className="block-flex">
          <FieldText
            placeHolder="First Name"
            label="First Name"
            name="firstName"
            type="text"
            defaultValue={info.firstName}
            error={error.firstName}
            register={register}
          ></FieldText>
          <FieldText
            placeHolder="Last Name"
            label="Last Name"
            name="lastName"
            error={error.lastName}
            defaultValue={info.lastName}
            register={register}
          ></FieldText>
        </div>
        <FieldText
          placeHolder="Email"
          label="Email"
          name="email"
          error={error.email}
          defaultValue={info.email}
          register={register}
        ></FieldText>
        <FieldText
          placeHolder="Phone number"
          label="Phone number"
          name="phone"
          defaultValue={info.phone}
          register={register}
        ></FieldText>
        <div className="change-password">
          <FieldText
            placeHolder="Password"
            label="Password"
            type="password"
            defaultValue="******************"
            readOnly={true}
          ></FieldText>
          <div
            className="change-password__link"
            onClick={() => {
              dispatch({
                type: STUDENT_PROFILE_ACTION.MODAL_OPEN,
              });
            }}
          >
            Đổi mật khẩu
          </div>
        </div>
        <input
          type="number"
          defaultValue={info.gender}
          {...register("gender")}
          hidden
        ></input>
        <RadioButton
          items={["Male", "Female", "Other"]}
          value={gender}
          onChange={(e) => {
            setValue("gender", +e.target.value);
            setGender(+e.target.value);
          }}
        ></RadioButton>
        <input type="submit" ref={submit} hidden></input>
      </form>
      <div className="btn-groups-edit">
        <div className="edit-profile__btn-controls">
          <Button
            className="btn--color-white"
            content="Cancel"
            onClick={handleCancelBtn}
          ></Button>
          <Button
            className="btn--hover-change-color"
            content="Cập nhật"
            onClick={() => {
              submit.current.click();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
