// @flow 
import * as React from 'react';
import './style.scss';
import { Checkbox, InputWithLabel, Button } from '../../../../components';

export const LoginForm = (props) => {
    return (
        <div className='login-form'>
            <h1 className='login-form__title'>Login</h1>
            <h3 className='login-form__desc'><span>Welcome!</span> Please confirm that you are visiting</h3>
            <div className='login-form__body-main'>
                <InputWithLabel name='email' className='input--shadow' labelName='Email' type='text'></InputWithLabel>
                <InputWithLabel name='password' className='input--shadow' labelName='Password' type='password'></InputWithLabel>
                <div className='option-login'>
                    <div className='option-login__remember'>
                        <Checkbox className='option-login__remember-input checkbox-basic'></Checkbox>
                        <p className='option-login__remember-text'>Remember Password</p>
                    </div>
                    <p className='option-login__forget-password'>Forget Password?</p>
                </div>
                <Button className='btn--hover-vertical-change-color' content='Login'></Button>
            </div>

            <p className='login-form__register'>New User? <span>Register</span></p>

        </div>
    );
};