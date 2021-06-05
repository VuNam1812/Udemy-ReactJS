// @flow 
import React, { useState } from 'react';
import { HeaderUpper } from '../../header/HeaderUpper/headerUpper';
import { Footer } from '../../footer/footer';
import { ReadyJoin } from '../home/readyJoin/readyJoin';
import { InComing } from '../../incoming/inComing';
import { Introduce, Videos, Teacher, Feedback } from './descContent';

import { Button } from '../../../components';
import course_1 from '../../../public/image/course_1.jpg'
import './style.scss';
export const CourseDetail = (props) => {
    const [left, setLeft] = useState(0);
    const [active, setActive] = useState(['active', '', '', '']);

    const handleTab = (e) => {
        const index = +e.target.getAttribute('data-id');
        setLeft(index * 25);
        const newActive = ['', '', '', ''];
        newActive[index] = 'active';
        setActive(newActive);
    }
    return (
        <div className='course-detail'>
            <HeaderUpper></HeaderUpper>
            <InComing></InComing>
            <div className='wrap'>
                <div className='course-detail__body'>

                    <div className='content'>
                        <div className='course-desc'>
                            <ul className='course-desc__header'>
                                <li className='course-desc__header-item tab-indicator' style={{ left: `${left}%` }}></li>
                                <li data-id='0' className={`course-desc__header-item ${active[0]}`} onClick={handleTab}>Giới thiệu</li>
                                <li data-id='1' className={`course-desc__header-item ${active[1]}`} onClick={handleTab}>Giảng viên</li>
                                <li data-id='2' className={`course-desc__header-item ${active[2]}`} onClick={handleTab}>Video</li>
                                <li data-id='3' className={`course-desc__header-item ${active[3]}`} onClick={handleTab}>Đánh giá</li>
                            </ul>
                            <div className='course-desc__content'>
                                <div className={`course-desc__content-item ${active[0]}`}>
                                    <Introduce></Introduce>
                                </div>
                                <div className={`course-desc__content-item ${active[1]}`}>
                                    <Teacher></Teacher>
                                </div>
                                <div className={`course-desc__content-item ${active[2]}`}>
                                    <Videos></Videos>
                                </div>
                                <div className={`course-desc__content-item ${active[3]}`}>
                                    <Feedback></Feedback>
                                </div>
                            </div>
                        </div>
                        <div className='left-content'>
                            <div className='left-content__body'>
                                <div className='image-course' style={{ backgroundImage: `url(${course_1})` }}>
                                    <Button className='image-course__btn btn-afer-rounded'><i className="fa fa-play fa-3x image-course__icon" aria-hidden="true"></i></Button>
                                    <p className='image-course__desc'>Preview this course</p>
                                </div>

                                <div className='join-course'>
                                    <p className='join-course__price'>100.000 VND</p>
                                    <Button className='join-course__add-fav-btn btn-smaller btn--hover-horizontal-change-color' content='Add to Favorite!'></Button>
                                    <Button className='join-course__join-btn btn--color-white btn--hover-vertical-change-color-reverse' content='Join now!'></Button>
                                </div>

                                <div className='sub-desc'>
                                    <p className='sub-desc__title'>Khóa học này bao gồm</p>
                                    <div className='sub-desc__detail'>
                                        <p className='sub-desc__detail-item'><i className="fa fa-clock-o" aria-hidden="true"></i>2 giờ</p>
                                        <p className='sub-desc__detail-item'><i className="fa fa-refresh" aria-hidden="true"></i>Truy cập mọi lúc</p>
                                        <p className='sub-desc__detail-item'><i className="fa fa-mobile fa-lg" aria-hidden="true"></i>Học tập ngay trên điện thoại di động</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReadyJoin></ReadyJoin>
            <Footer></Footer>
        </div>
    );
};