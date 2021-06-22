// @flow
import React, { useState } from "react";
import "./style.scss";

import {
  Checkbox,
  InputWithLabel,
  Button,
  RadioButton,
} from "../../../../components";

export const RegisterForm = (props) => {
  const [gender, setGender] = useState(-1);
  return (
    <div className={`register-form ${props.className}`}>
      <h1 className="register-form__title">Register</h1>
      <h3 className="register-form__desc">
        <span>Welcome!</span> Please confirm that you are visiting
      </h3>
      <div className="register-form__body-main">
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="First Name"
            name="firstName"
            className="input--shadow"
            labelName="First Name"
            type="text"
          ></InputWithLabel>
          <InputWithLabel
            placeHolder="Last Name"
            name="lastName"
            className="input--shadow"
            labelName="Last Name"
            type="text"
          ></InputWithLabel>
        </div>
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="Email address"
            name="email"
            className="input--shadow"
            labelName="Email Address"
            type="text"
          ></InputWithLabel>
          <InputWithLabel
            placeHolder="+84 (942) 000 000"
            name="phone"
            className="input--shadow"
            labelName="Phone Number"
            type="text"
          ></InputWithLabel>
        </div>
        <div className="form-multi-input">
          <InputWithLabel
            placeHolder="Password"
            name="password"
            className="input--shadow"
            labelName="Password"
            type="password"
          ></InputWithLabel>
          <InputWithLabel
            placeHolder="Confirm Password"
            name="confirmPassword"
            className="input--shadow"
            labelName="Confirm Password"
            type="password"
          ></InputWithLabel>
        </div>
        <RadioButton
          className="gender"
          items={["Male", "Female", "Other"]}
          value={gender}
          onChange={(e) => {
            setGender(+e.target.value);
          }}
        ></RadioButton>
        <div className="form-multi-input">
          <div className="confirm-condition">
            <Checkbox
              id="cbConfirm"
              className="confirm-condition__input checkbox-basic"
            ></Checkbox>
            <label htmlFor="cbConfirm" className="confirm-condition__text">
              I agree the user agreement and <span>Terms & Conditions</span>
            </label>
          </div>
        </div>
        <Button
          className="btn--hover-horizontal-change-color"
          content="Register"
          onClick={() => {
            props.setActive(2);
          }}
        ></Button>
      </div>

      <p className="register-form__register">
        Already have an account?? <span>Sign In</span>
      </p>
    </div>
  );
};
