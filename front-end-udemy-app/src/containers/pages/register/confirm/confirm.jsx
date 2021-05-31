// @flow 
import React from 'react';
import './style.scss';
import verifyEmail from '../../../../public/image/verifyEmail.PNG';
import { Button, Input } from '../../../../components';
export const Confirm = (props) => {
    return (
        <div className={`confirm ${props.className}`}>
            <div className='confirm__image'>
                <img src={verifyEmail}></img>
            </div>
            <h1 className='confirm__title'>Xác thực Email</h1>
            <h4 className='confirm__desc'>Mã xác nhận đã được gửi đến địa chỉ Email. Kiểm tra lại Email đăng ký và nhập mã xác thực vào ô bên dưới</h4>

            <Input placeHolder='Mã xác thực' type='text' className='confirm__input input--shadow input--center'></Input>
            <div className='btn-group'>
                <Button className='btn--color-white' content='Back' onClick={() => { props.setActive(1) }}></Button>
                <Button className='btn--hover-horizontal-change-color' content='Confirm code'></Button>
            </div>
        </div>
    );
};