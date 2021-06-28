// @flow 
import * as React from 'react';
import { HeaderUpper } from '../../header/HeaderUpper/headerUpper';
import { LoginForm } from './loginForm/loginForm';
import { Footer } from '../../footer/footer';
import './style.scss'
export const Login = (props) => {
    return (
        <div className='login'>
            <HeaderUpper className="header--zoom-80"></HeaderUpper>
            <div className='login-body'>
                <div className='wrap'>
                    <LoginForm></LoginForm>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};