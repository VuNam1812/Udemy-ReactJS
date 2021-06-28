// @flow 
import React, { useState } from 'react';
import { HeaderUpper } from '../../header/HeaderUpper/headerUpper';
import { RegisterForm } from './registerForm/registerform';
import { Confirm } from './confirm/confirm';
import { Footer } from '../../footer/footer';
import './style.scss'

export const Register = (props) => {
    const [step, setStep] = useState(1);
    return (
      <div className="register">
        <HeaderUpper className="header--zoom-80"></HeaderUpper>
        <div className="register-body">
          <div className="wrap">
            <div className="wrap__cover">
              <RegisterForm
                setActive={setStep}
                className={`${step === 1 ? "active" : "hidden"}`}
              ></RegisterForm>
              <Confirm
                setActive={setStep}
                className={`${step === 2 ? "active" : "hidden"}`}
              ></Confirm>
            </div>
          </div>
        </div>
        <Footer coverFooter={true}></Footer>
      </div>
    );
};