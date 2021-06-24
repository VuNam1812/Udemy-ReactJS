// @flow 
import * as React from 'react';
import './style.scss'

import teacherImg from '../../../../../public/image/teacher_1.png';
export const Introduce = (props) => {
    return (
        <div className='introduce'>
            <p className='introduce__category'>CNTT và Phần mềm - Lập trình Android</p>
            <h2 className='introduce__name'>Python : La Formation Complète</h2>
            <p className='introduce__mini-desc'>Créez des sites web, des applications de bureau, faites du traitement de données ou encore des jeux, tout ça avec Python</p>

            <div className='course__statistics'>
                <p className='course__statistics-joiner'>23.564 học viên</p>
                <div className='rating'>
                    <div className='rating__stars'>
                        <p>4.5</p>
                        <div className='stars'>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                    <p className='rating__number'>(1.234) đánh giá</p>
                </div>

                <p className='course__statistics-viewer'>256 lượt xem</p>
            </div>

            <p className='introduce__last-update'><i className="fa fa-exclamation-circle icon" aria-hidden="true"></i>Last updated 5/2021</p>

            <div className='introduce__learn'>
                <p className='title--highlight'>Bạn sẽ được học</p>
                <div className='content-title'>
                    <p className='content-title__empty'>(Hiện đang trống)</p>
                </div>
            </div>

            <div className='introduce__require'>
                <p className='title--highlight'>Yêu cầu</p>
                <div className='content-title'>
                    <p className='content-title__empty'>(Hiện đang trống)</p>
                </div>
            </div>
            <div className='introduce__teacher'>
                <p className='title--highlight'>Giảng viên</p>
                <div className='content-title content-teacher'>
                    <div className='mini-teacher-card'>
                        <div className='mini-teacher-card__image'>
                            <img src={teacherImg}></img>
                        </div>
                        <div className='mini-teacher-card__info'>
                            <p className='mini-teacher-card__info-name'>Stephane Smith</p>
                            <p className='mini-teacher-card__info-major'>Certified instructor Architecture & Developer</p>
                        </div>
                        <div className='mini-teacher-card__contact'>
                            <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
                        </div>
                        <p className='mini-teacher-card__link'>Know More <i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </div>
                    <div className='mini-teacher-card'>
                        <div className='mini-teacher-card__image'>
                            <img src={teacherImg}></img>
                        </div>
                        <div className='mini-teacher-card__info'>
                            <p className='mini-teacher-card__info-name'>Stephane Smith</p>
                            <p className='mini-teacher-card__info-major'>Certified instructor Architecture & Developer</p>
                        </div>
                        <div className='mini-teacher-card__contact'>
                            <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
                        </div>
                        <p className='mini-teacher-card__link'>Know More <i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </div>
                    <div className='mini-teacher-card'>
                        <div className='mini-teacher-card__image'>
                            <img src={teacherImg}></img>
                        </div>
                        <div className='mini-teacher-card__info'>
                            <p className='mini-teacher-card__info-name'>Stephane Smith</p>
                            <p className='mini-teacher-card__info-major'>Certified instructor Architecture & Developer</p>
                        </div>
                        <div className='mini-teacher-card__contact'>
                            <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                            <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
                        </div>
                        <p className='mini-teacher-card__link'>Know More <i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </div>
                </div>
            </div>

        </div>
    );
};