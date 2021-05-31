// @flow 
import * as React from 'react';
import './style.scss';
import { Button } from '../../../../components';

import imageCourse from '../../../../public/image/course_1.jpg';

export const TopCourses = (props) => {
    return (
        <div className='top-courses'>
            <div className='wrap'>
                <div className='top-courses-item'>
                    <div className='top-courses-item__title'>
                        <h2 className='top-courses-item__title-main'>Our top courses</h2>
                        <p className='top-courses-item__title-desc'>Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered.
                            Get Stared </p>
                    </div>
                    <Button className='top-courses-item__btn-all btn--hover-horizontal-change-color' content='See more'></Button>
                </div>
                {
                    dataSet.map((course) => {
                        return (
                            <div className='top-courses-item'>
                                <div className='cover-image'>
                                    <div className='top-courses-item__image' style={{ backgroundImage: `url(${imageCourse})` }}></div>
                                </div>
                                <div className='top-courses-item__body'>
                                    <div className='top-courses-item__title'>
                                        <div className='title-main'>
                                            <h3 className='title-main__course-name'>{course.courseName}</h3>
                                            <h3 className='title-main__course-price'>$ {course.coursePrice}</h3>
                                        </div>
                                        <p className='top-courses-item__title-desc'>{course.courseMiniDesc}</p>
                                    </div>
                                    <div className='top-courses-item__enroll-btn'>
                                        <h3 className='lecture-count'>{course.lectureCount} Bài giảng</h3>
                                        <Button className='btn-smaller btn--hover-change-color' content='Enroll now'></Button>
                                    </div>
                                </div>
                            </div>

                        );
                    })
                }



            </div>
        </div>
    );
};

const dataSet = [
    { id: 1, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 2, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 3, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 4, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 5, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
];