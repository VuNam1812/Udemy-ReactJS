// @flow 
import React from 'react';

import { HeaderUpper } from '../../header/HeaderUpper/headerUpper';
import { Expander } from '../../../components';
import './style.scss';
export const CourseLession = (props) => {
    return (
        <div className='course-lession'>
            <HeaderUpper></HeaderUpper>
            <div className='lession-content'>
                <div className='right-content'>
                    <div className='right-content__video'></div>
                    <div className='info-lession'>
                        <ul className='info-lession__header'>
                            <li className='info-lession__header-item active'>Tổng quan</li>
                        </ul>
                        <div className='info-lession__body'>
                            <p className='info-lession__body-title'>UI/UX Master</p>

                            <div className='course-info'>
                                <div className='course-info__item'>
                                    <p>Số lượng học sinh: <span className='text--normal'>32</span></p>
                                    <p>Tổng số bài học: <span className='text--normal'>03</span></p>
                                    <p>Tổng số giờ học: <span className='text--normal'>07</span></p>
                                </div>
                                <div className='course-info__item text--left'>
                                    <p>Mô tả khóa học</p>
                                    <p className='text--normal course-info__main'>Blend màu có thể hiểu một cách đơn giản là sự hòa trộn các màu sắc, ánh sáng trong một bức ảnh để tạo nên thông điệp độc đáo mà mỗi chúng ta muốn truyền đạt.</p>
                                </div>
                                <div className='course-info__item text--left'>
                                    <p>Giảng viên</p>
                                    <p className='course-info__teacher'>Hoàng phúc Photo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='left-content'>
                    <div className='lession-videos'>
                        <Expander className='active' title='UI/UX Master'>
                            <div className='lecture-video active'>
                                <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                                <p className='lecture-video__duration'><i className="icon fa fa-clock-o" aria-hidden="true"></i>00 : 00 : 00</p>
                            </div>
                            <div className='lecture-video active'>
                                <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                                <p className='lecture-video__duration'><i className="icon fa fa-clock-o" aria-hidden="true"></i>00 : 00 : 00</p>
                            </div>
                            <div className='lecture-video active'>
                                <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                                <p className='lecture-video__duration'><i className="icon fa fa-clock-o" aria-hidden="true"></i>00 : 00 : 00</p>
                            </div>
                            <div className='lecture-video active'>
                                <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                                <p className='lecture-video__duration'><i className="icon fa fa-clock-o" aria-hidden="true"></i>00 : 00 : 00</p>
                            </div>
                            <div className='lecture-video active'>
                                <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                                <p className='lecture-video__duration'><i className="icon fa fa-clock-o" aria-hidden="true"></i>00 : 00 : 00</p>
                            </div>
                        </Expander>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};