// @flow
import React, { useReducer, useRef } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { reducer, ACTION } from "./reducer";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { handleValidate } from "./handleValidate";
import {
  Checkbox,
  InputWithLabel,
  Button,
  RadioButton,
} from "../../../../components";

const initData = {
  firstName: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  lastName: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  email: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  dob: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  password: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  confirmPassword: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
};

export const RegisterForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, dispatch_error] = useReducer(reducer, initData);
  const submit = useRef();

  const onSubmitForm = async (data) => {
    if (!handleValidate.validateAll(data, dispatch_error)) return;
    if (!handleValidate.validateConfirmPassword(data, dispatch_error)) return;
    if (!handleValidate.validateGender(props.store.account.gender)) return;
    if (!(await handleValidate.validateEmail(data.email, dispatch_error)))
      return;
    delete data.confirmPassword;

    props.dispatch({
      type: props.action.UPDATE_DATA,
      payload: data,
    });
  };
  return (
    <div className={`register-form ${props.className}`}>
      <h1 className="register-form__title">Register</h1>
      <h3 className="register-form__desc">
        <span>Welcome!</span> Please confirm that you are visiting
      </h3>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="register-form__body-main"
      >
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="First Name"
            name="firstName"
            register={register}
            className="input--shadow"
            labelName="First Name"
            type="text"
            error={{
              isShow: error.firstName.show,
              message: error.firstName.message,
            }}
          ></InputWithLabel>
          <InputWithLabel
            placeHolder="Last Name"
            name="lastName"
            register={register}
            className="input--shadow"
            labelName="Last Name"
            type="text"
            error={{
              isShow: error.lastName.show,
              message: error.lastName.message,
            }}
          ></InputWithLabel>
        </div>
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="Email address"
            name="email"
            register={register}
            className="input--shadow"
            labelName="Email Address"
            type="text"
            error={{
              isShow: error.email.show,
              message: error.email.message,
            }}
          ></InputWithLabel>
          <div className="date-time">
            <label className="date-time__label">
              Date of Birthday
              <DatePickerComponent
                format="dd-MM-yyyy"
                name="dob"
                {...register("dob")}
                className="date-time__input"
                placeholder="Date of Birthday"
              ></DatePickerComponent>
            </label>
          </div>
        </div>
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="Password"
            name="password"
            register={register}
            className="input--shadow"
            labelName="Password"
            type="password"
            error={{
              isShow: error.password.show,
              message: error.password.message,
            }}
          ></InputWithLabel>
          <InputWithLabel
            placeHolder="Confirm Password"
            name="confirmPassword"
            register={register}
            className="input--shadow"
            labelName="Confirm Password"
            type="password"
            error={{
              isShow: error.confirmPassword.show,
              message: error.confirmPassword.message,
            }}
          ></InputWithLabel>
        </div>
        <RadioButton
          className="gender"
          items={["Male", "Female", "Other"]}
          value={-1}
          onChange={(e) => {
            props.dispatch({
              type: props.action.UPDATE_GENDER,
              payload: +e.target.value,
            });
          }}
        ></RadioButton>
        <input ref={submit} type="submit" hidden></input>
        <Button
          className="btn--hover-horizontal-change-color"
          content="Register"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </form>

      <p className="register-form__register">
        Already have an account?? <span>Sign In</span>
      </p>
    </div>
  );
};
