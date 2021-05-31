// @flow 
import React from 'react';
import './style.scss';
import { Button } from '../../../../components';
import imgEdu from '../../../../public/image/education.png';
export const AboutUs = (props) => {
    return (
        <div className='about-us'>
            <div className='about-us__background'></div>
            <div className='wrap'>
                <div className='about-us__image'>
                    <img src={imgEdu}></img>
                </div>
                <div className='about-us__content'>
                    <h2 className='about-us__content-title'>Our education system works for you</h2>
                    <p className='about-us__content-desc'>Replenish him third creature and meat blessed void a fruit gathered you’re,
                    they’re two waters own morning gathered greater shall had behold had seed.</p>
                    <Button className='about-us__content-btn btn--color-white btn--hover-vertical-change-color-reverse'
                        content='Learn more'>
                        <i className="fa fa-chevron-right about-us__content-icon" aria-hidden="true" />
                    </Button>
                </div>
            </div>

        </div>
    );
};