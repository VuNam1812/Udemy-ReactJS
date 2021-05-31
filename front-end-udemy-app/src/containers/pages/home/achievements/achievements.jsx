// @flow 
import * as React from 'react';
import './style.scss';

import totalCourseImage from '../../../../public/image/open-book.png';
import totalStudentImage from '../../../../public/image/graduate.png';
import globelImage from '../../../../public/image/worldwide.png';


export const Achievements = (props) => {
    return (
        <div className='achievements'>
            <div className='wrap'>
                <div className='achievements__header'>
                    <p className='achievements__header-title'>Our achievements</p>
                    <p className='achievements__header-desc'>Replenish him third creature and meat blessed void a fruit gathered you’re, they’re
two waters own morning gathered greater shall had behold had seed.</p>
                </div>
                <div className='achievements__body'>
                    <div className='body-item'>
                        <div className='body-item__image'>
                            <img src={totalCourseImage}></img>
                        </div>
                        <p className='body-item__title'>Total Courses</p>
                        <p className='body-item__count'>50+</p>
                    </div>

                    <div className='body-item item-image-blue'>
                        <div className='body-item__image'>
                            <img src={totalStudentImage}></img>
                        </div>
                        <p className='body-item__title'>Total Students</p>
                        <p className='body-item__count'>45K+</p>
                    </div>

                    <div className='body-item item-image-organge'>
                        <div className='body-item__image'>
                            <img src={globelImage}></img>
                        </div>
                        <p className='body-item__title'>Global Positions</p>
                        <p className='body-item__count'>115</p>
                    </div>
                </div>
            </div>
        </div>
    );
};