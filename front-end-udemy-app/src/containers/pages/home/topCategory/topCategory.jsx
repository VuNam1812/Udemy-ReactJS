// @flow 
import React, { useState, useEffect } from 'react';
import './style.scss'
import cateImg from '../../../../public/image/course_1.jpg';
export const TopCategory = (props) => {
    return (
        <div className='top-categories'>
            <div className='wrap'>
                <div className='top-categories__body'>
                    <div className='body-group'>
                        {
                            dataSet.map(cat => {
                                return (
                                    <div key={cat.id} className='body-item'>
                                        <div className='body-item__image' style={{ backgroundImage: `url(${cat.catImg})` }}></div>
                                        <div className='body-item__content'>
                                            <p className='body-item__content-cat-name'>{cat.catName}</p>
                                            <p className='body-item__content-joiner'>({cat.joiner}) Người đăng ký</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

const dataSet = [
    { id: 1, catImg: cateImg, catName: 'CNTT và Phần mềm', joiner: '100.000' },
    { id: 2, catImg: cateImg, catName: 'CNTT và Phần mềm', joiner: '100.000' },
    { id: 3, catImg: cateImg, catName: 'CNTT và Phần mềm', joiner: '100.000' },
    { id: 4, catImg: cateImg, catName: 'CNTT và Phần mềm', joiner: '100.000' },
    { id: 5, catImg: cateImg, catName: 'CNTT và Phần mềm', joiner: '100.000' },
]