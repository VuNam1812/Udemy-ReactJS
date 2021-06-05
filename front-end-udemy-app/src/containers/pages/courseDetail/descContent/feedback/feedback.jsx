// @flow 
import React from 'react';
import './style.scss'

import { Button } from '../../../../../components';
import teacherImage from '../../../../../public/image/teacher_1.jpg';
export const Feedback = (props) => {
    return (
        <div className='feedback'>
            <div className='feedback__header'>
                <div className='feedback__header-summary'>
                    <p className='feedback__header-summary-rate'>4.8<span> / 5</span></p>
                    <p className='feedback__header-summary-feedback'>(100 bình chọn )</p>
                </div>
                <div className='feedback__header-detail'>
                    {
                        dataStar.map((rate, index) => {
                            return (
                                <div className='rate-item'>
                                    <p className='rate-item__index'>{index + 1} <i className="icon fa fa-star" aria-hidden="true"></i></p>
                                    <div className='rate-item__rate-bar'>
                                        <div className='loading-bar' style={{ width: `${rate.percent}%` }}></div>
                                    </div>
                                    <div className='group-detail'>
                                        <p className='rate-item__feedback'> ({rate.feedbacks})</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='feedback__body'>
                <Button className='feedback__body-add-btn btn--color-white' content='Thêm bình luận'></Button>
                <div className='feedback__body-group'>
                    <div className='item'>
                        <div className='item-user'>
                            <div className='item-user__image'>
                                <img src={teacherImage}></img>
                            </div>
                            <p className='item-user__name'>Vũ Thành Nam</p>
                        </div>

                        <div className='item-feedback-info'>
                            <div className='item-feedback-info__header'>
                                <div className='item-feedback-info__header-stars'>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                </div>
                                <div className='group-info'>
                                    <p className='item-feedback-info__header-time'>18 Thg 03 2021 22:51</p>
                                    <div className='item-feedback-info__header-reaction'>
                                        <span className='like'><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>
                                        <span className='dislike'><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>
                                        <p className='report'>Báo cáo</p>
                                    </div>
                                </div>
                            </div>
                            <p className='item-feedback-info__text'>Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. </p>
                        </div>
                    </div>

                    <div className='item'>
                        <div className='item-user'>
                            <div className='item-user__image'>
                                <img src={teacherImage}></img>
                            </div>
                            <p className='item-user__name'>Vũ Thành Nam</p>
                        </div>

                        <div className='item-feedback-info'>
                            <div className='item-feedback-info__header'>
                                <div className='item-feedback-info__header-stars'>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                    <i className="icon fa fa-star" aria-hidden="true"></i>
                                </div>
                                <div className='group-info'>
                                    <p className='item-feedback-info__header-time'>18 Thg 03 2021 22:51</p>
                                    <div className='item-feedback-info__header-reaction'>
                                        <span className='like'><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>
                                        <span className='dislike'><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>
                                        <p className='report'>Báo cáo</p>
                                    </div>
                                </div>
                            </div>
                            <p className='item-feedback-info__text'>Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. </p>
                        </div>
                    </div>
                
                </div>
                <Button className='feedback__body-loadmore-btn btn--none' content='----- Tải thêm -----'></Button>
                
                <p className='feedback__body-empty'>(Hiện chưa có bình luận cho khóa học)</p>
            </div>
        </div>
    );
};

const dataStar = [
    { feedbacks: '10.000', percent: 10 },
    { feedbacks: '20.000', percent: 35 },
    { feedbacks: '30.000', percent: 80 },
    { feedbacks: '40.000', percent: 52 },
    { feedbacks: '50.000', percent: 100 },
]