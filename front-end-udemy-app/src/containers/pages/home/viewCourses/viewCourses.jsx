// @flow 
import React, { useState, useEffect } from 'react';
import './style.scss';

import eduImage from '../../../../public/image/course_1.jpg';
import eduImage_1 from '../../../../public/image/new_course.jpg';
import eduImage_2 from '../../../../public/image/banner.png';
import eduImage_3 from '../../../../public/image/Register_Jumbotron.jpg';
import eduImage_4 from '../../../../public/image/education.png';
let exists = [];
export const ViewCourses = (props) => {
    const [rotate, setRotate] = useState(true);
    const [active, setActive] = useState(0);
    const [carousel, setCarousel] = useState([]);
    const [carouselAnim, setCarouselAnim] = useState([]);

    useEffect(() => {
        generateCarousel(0);
    }, [])

    const generateCarousel = (direct) => {
        const arrTemp = [];
        for (let index = 0; index < 5; index++) {
            arrTemp.push('hidden');
        }

        arrTemp[calcNumber(active + direct, 0, 4, direct)] = `active`;
        arrTemp[calcNumber(active + direct - 1, 0, 4, direct)] = 'prev';
        arrTemp[calcNumber(active + direct + 1, 0, 4, direct)] = 'next';
        arrTemp[calcNumber(active + direct - 2, 0, 4, direct)] = `wait-prev`;
        arrTemp[calcNumber(active + direct + 2, 0, 4, direct)] = 'wait-next';

        exists = [];
        setCarousel(arrTemp);
        setRotate(true);
    }

    const generateCarouselAnim = (direct) => {
        const arrTemp = [];
        for (let index = 0; index < 5; index++) {
            arrTemp.push('hidden');
        }

        arrTemp[calcNumber(active, 0, 4, direct)] = `${(direct === 0) ? '' : (direct === 1) ? 'active-anim-prev-reverse' : 'active-anim-next-reverse'}`;
        arrTemp[calcNumber(active - 1, 0, 4, direct)] = `${(direct === 0) ? '' : (direct === 1) ? 'prev-to-wait-anim' : 'active-anim-prev'}`;
        arrTemp[calcNumber(active + 1, 0, 4, direct)] = `${(direct === 0) ? '' : (direct === 1) ? 'active-anim-next' : 'next-to-wait-anim'}`;
        arrTemp[calcNumber(active - 2, 0, 4, direct)] = `${(direct === 0) ? '' : (direct === 1) ? '' : 'wait-to-prev-anim'}`;
        arrTemp[calcNumber(active + 2, 0, 4, direct)] = `${(direct === 0) ? '' : (direct === 1) ? 'wait-to-next-anim' : ''}`;

        exists = [];
        setCarouselAnim(arrTemp);
        setTimeout(() => {
            generateCarousel(direct);
        }, 370);

    }

    const calcNumber = (value, min, max, direct) => {
        let current = (value > max) ? min : (value < min) ? max : value;
        for (let index = 0; index <= max; index++) {

            if (exists.includes(current)) {
                current += (direct === 0) ? -1 : direct;
            } else {
                break;
            }
        }

        exists.push(current);
        return current;
    }

    const handleNextBtn = () => {
        if (!rotate) return;
        setActive(((active + 1) > 4) ? 0 : (active + 1));
        generateCarouselAnim(1);
        setRotate(false);
    }

    const handlePrevBtn = () => {
        if (!rotate) return;
        setActive(((active - 1) < 0) ? 4 : (active - 1));
        generateCarouselAnim(-1);
        setRotate(false);
    }

    return (
        <div className='view-courses'>

            <p className='view-courses__header'>
                Khóa Học Được Xem Nhiều Nhất
            </p>
            <div className='wrap'>
                <div className='carousel'>
                    <div className={`carousel__item ${carousel[0]} ${carouselAnim[0]}`}>
                        <div className='image' style={{ backgroundImage: `url(${eduImage})` }}></div>
                    </div>

                    <div className={`carousel__item ${carousel[1]} ${carouselAnim[1]}`}>
                        <div className='image' style={{ backgroundImage: `url(${eduImage_1})` }}></div>
                    </div>
                    <div className={`carousel__item ${carousel[2]} ${carouselAnim[2]}`}>
                        <div className='image' style={{ backgroundImage: `url(${eduImage_2})` }}></div>
                    </div>

                    <div className={`carousel__item ${carousel[3]} ${carouselAnim[3]}`}>
                        <div className='image' style={{ backgroundImage: `url(${eduImage_3})` }}></div>
                    </div>

                    <div className={`carousel__item ${carousel[4]} ${carouselAnim[4]}`}>
                        <div className='image' style={{ backgroundImage: `url(${eduImage_4})` }}></div>
                    </div>

                </div>

                <div className='course-preview'>
                    <p className='course-preview__name'>The Complete 2021 Web Development Bootcamp</p>
                    <p className='course-preview__category'>Development | Web Development</p>
                </div>
            </div>
            <div className='btn-group'>
                <div className='btn-control' onClick={handlePrevBtn}>
                    <i class="fa fa-angle-left fa-2x btn-control__icon" aria-hidden="true"></i>
                </div>
                <div className='btn-control' onClick={handleNextBtn}>
                    <i class="fa fa-angle-right fa-2x btn-control__icon" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};