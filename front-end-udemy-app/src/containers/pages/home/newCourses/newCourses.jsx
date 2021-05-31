// @flow 
import * as React from 'react';
import './style.scss';

import newCourseImage from '../../../../public/image/new_course.jpg';

export const NewCourses = (props) => {
    return (
        <div className='new-courses'>
            <div className='new-courses__image' style={{backgroundImage:`url(${newCourseImage})`}}></div>

            <div className='new-courses-body'>
                <p className='new-courses-body__title'>Upcomming Courses</p>

                <div className='body-content'>
                    <div className='body-item'>
                        <div className='body-item__header'>
                            <div className='body-item__date'><span className='high-light-circle'>23</span> MAY 2021</div>
                            <div className='body-item__category-name'>Development | Web Development</div>
                        </div>

                        <div className='body-item__content'>
                            <div className='course-info'>
                                <div className='course-info__name'>The Complete 2021 Web Development Bootcamp</div>
                                <div className='course-info__mentor'>Dr. Angela Yu</div>
                            </div>
                            <div className='body-item__price'>
                                <div className='cover-before'>zxc</div>
                                <p>$ 9.999.99</p>
                                <div className='cover-after'>{' '}</div>
                            </div>
                        </div>
                   
                        <div className='body-item__bar'></div>
                    </div>

                    <div className='body-item'>
                        <div className='body-item__header'>
                            <div className='body-item__date'><span className='high-light-circle'>23</span> MAY 2021</div>
                            <div className='body-item__category-name'>Development | Web Development</div>
                        </div>

                        <div className='body-item__content'>
                            <div className='course-info'>
                                <div className='course-info__name'>The Complete 2021 Web Development Bootcamp</div>
                                <div className='course-info__mentor'>Dr. Angela Yu</div>
                            </div>
                            <div className='body-item__price'>
                                <div className='cover-before'>zxc</div>
                                <p>$ 9.999.99</p>
                                <div className='cover-after'>{' '}</div>
                            </div>
                        </div>
                   
                        <div className='body-item__bar'></div>
                    </div>

                    <div className='body-item'>
                        <div className='body-item__header'>
                            <div className='body-item__date'><span className='high-light-circle'>23</span> MAY 2021</div>
                            <div className='body-item__category-name'>Development | Web Development</div>
                        </div>

                        <div className='body-item__content'>
                            <div className='course-info'>
                                <div className='course-info__name'>The Complete 2021 Web Development Bootcamp</div>
                                <div className='course-info__mentor'>Dr. Angela Yu</div>
                            </div>
                            <div className='body-item__price'>
                                <div className='cover-before'>zxc</div>
                                <p>$ 9.999.99</p>
                                <div className='cover-after'>{' '}</div>
                            </div>
                        </div>
                   
                        <div className='body-item__bar'></div>
                    </div>

                </div>
            </div>
        </div>
    );
};