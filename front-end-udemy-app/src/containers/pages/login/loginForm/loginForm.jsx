// @flow
import React, { useRef } from "react";
import "./style.scss";
import { Checkbox, InputWithLabel, Button } from "../../../../components";
import { handleValidate } from "../middlewares/handleValidateLogin";
import { handleAction } from "../middlewares/handleActionLogin";
import { useForm } from "react-hook-form";

export const LoginForm = (props) => {
  const { register, handleSubmit } = useForm();
  const submit = useRef();

  const onSubmitLogin = (data) => {
    if (!handleValidate.validateAll(data, props.dispatch)) return;
    handleAction.updateStoreLogin(data, props.dispatch);
  };

  return (
    <div className="login-form">
      <h1 className="login-form__title">Login</h1>
      <h3 className="login-form__desc">
        <span>Welcome!</span> Please confirm that you are visiting
      </h3>
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        className="login-form__body-main"
      >
        <InputWithLabel
          register={register}
          name="email"
          className="input--shadow"
          labelName="Email"
          type="text"
          error={{
            isShow: props.store.error.email.isShow,
            message: props.store.error.email.message,
          }}
        ></InputWithLabel>
        <InputWithLabel
          register={register}
          name="password"
          className="input--shadow"
          labelName="Password"
          type="password"
          error={{
            isShow: props.store.error.password.isShow,
            message: props.store.error.password.message,
          }}
        ></InputWithLabel>
        <input type="submit" ref={submit} hidden></input>
        <div className="option-login">
          <div className="option-login__remember">
            <Checkbox className="option-login__remember-input checkbox-basic"></Checkbox>
            <p className="option-login__remember-text">Remember Password</p>
          </div>
          <p className="option-login__forget-password">Forget Password?</p>
        </div>
        <Button
          className="btn--hover-vertical-change-color"
          content="Login"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </form>

      <p className="login-form__register">
        New User? <span>Register</span>
      </p>
    </div>
  );
};
