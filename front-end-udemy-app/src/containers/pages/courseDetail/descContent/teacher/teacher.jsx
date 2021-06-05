// @flow 
import * as React from 'react';
import './style.scss'
import teacherImg from '../../../../../public/image/teacher_1.jpg';
export const Teacher = (props) => {
    return (
        <div className='teacher'>
            <div className='teacher-group'>
                <div className='item'>
                    <div className='decor'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='item__content'>
                        <div className='item__image-teacher'>
                            <div className='cover-img'></div>
                            <img src={teacherImg}></img>
                        </div>
                        <div className='teacher-info'>
                            <div className='teacher-info__contact'>
                                <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
                                <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                                <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                                <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
                            </div>

                            <div className='teacher-info__intro'>
                                <p className='teacher-info__intro-name'>Stephane Smith</p>
                                <p className='teacher-info__intro-major'>Certified instructor Architecture & Developer</p>
                                <div className='teacher-info__intro-achieve'>
                                    <div className='achieve-item'>
                                        <p className='achieve-item__count'>70</p>
                                        <p className='achieve-item__text'>Học viên</p>
                                    </div>
                                    <div className='achieve-item'>
                                        <p className='achieve-item__count'>4</p>
                                        <p className='achieve-item__text'>Khóa học</p>
                                    </div>
                                    <div className='achieve-item'>
                                        <div className='achieve-item__count'>
                                            3.5 <span className='text--smaller'>/ 5  <i className="icon fa fa-star" aria-hidden="true"></i></span>
                                        </div>
                                        <p className='achieve-item__text'>7 lượt đánh giá</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p className='item__intro-teacher'>
                        Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur. Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.
                    </p>
                </div>
            </div>
        </div>
    );
};