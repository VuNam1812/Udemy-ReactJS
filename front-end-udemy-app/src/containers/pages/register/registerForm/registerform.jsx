// @flow 
import React, { useState } from 'react';
import './style.scss';

import { Checkbox, InputWithLabel, Button } from '../../../../components';

export const RegisterForm = (props) => {
    const [gender, setGender] = useState({ male: false, female: false, others: false });

    const handleGenderCb = (value) => {
        const genderBase = { male: false, female: false, others: false };
        switch (value) {
            case 'male':
                setGender({ ...genderBase, male: true });
                break;
            case 'female':
                setGender({ ...genderBase, female: true });
                break;
            case 'others':
                setGender({ ...genderBase, others: true });
                break;
        }
    }

    return (
        <div className={`register-form ${props.className}`}>
            <h1 className='register-form__title'>Register</h1>
            <h3 className='register-form__desc'><span>Welcome!</span> Please confirm that you are visiting</h3>
            <div className='register-form__body-main'>
                <div className='form-multi-input'>
                    <InputWithLabel placeHolder='First Name' name='firstName' className='input--shadow' labelName='First Name' type='text'></InputWithLabel>
                    <InputWithLabel placeHolder='Last Name' name='lastName' className='input--shadow' labelName='Last Name' type='text'></InputWithLabel>
                </div>
                <div className='form-multi-input'>
                    <InputWithLabel placeHolder='Email address' name='email' className='input--shadow' labelName='Email Address' type='text'></InputWithLabel>
                    <InputWithLabel placeHolder='+84 (942) 000 000' name='phone' className='input--shadow' labelName='Phone Number' type='text'></InputWithLabel>
                </div>
                <div className='form-multi-input'>
                    <InputWithLabel placeHolder='Password' name='password' className='input--shadow' labelName='Password' type='password'></InputWithLabel>
                    <InputWithLabel placeHolder='Confirm Password' name='confirmPassword' className='input--shadow' labelName='Confirm Password' type='password'></InputWithLabel>
                </div>
                <div className='form-multi-input'>
                    <div className='gender'>
                        <div className='gender__item' onClick={() => { handleGenderCb('male') }}>
                            <Checkbox id='cbMale' className='checkbox-basic' checked={gender.male}></Checkbox>
                            <label htmlFor='cbMale' className='gender__item-text'>Male</label>
                        </div>
                        <div className='gender__item' onClick={() => { handleGenderCb('female') }}>
                            <Checkbox id='cbFemale' className='checkbox-basic' checked={gender.female}></Checkbox>
                            <label htmlFor='cbFemale' className='gender__item-text'>Female</label>
                        </div>
                        <div className='gender__item' onClick={() => { handleGenderCb('others') }}>
                            <Checkbox id='cbOthers' className='checkbox-basic' checked={gender.others}></Checkbox>
                            <label htmlFor='cbOthers' className='gender__item-text' >Others</label>
                        </div>
                    </div>
                </div>
                <div className='form-multi-input'>
                    <div className='confirm-condition'>
                        <Checkbox id='cbConfirm' className='confirm-condition__input checkbox-basic'></Checkbox>
                        <label htmlFor='cbConfirm' className='confirm-condition__text'>I agree the user agreement and <span>Terms & Conditions</span></label>
                    </div>
                </div>
                <Button className='btn--hover-horizontal-change-color' content='Register' onClick={() => { props.setActive(2) }}></Button>
            </div>

            <p className='register-form__register'>Already have an account?? <span>Sign In</span></p>

        </div >
    );
};