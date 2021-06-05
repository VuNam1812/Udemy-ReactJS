// @flow 
import * as React from 'react';
import { Expander } from '../../../../../components';
import './style.scss'
export const Videos = (props) => {
    return (
        <div className='videos'>
            <Expander className='active' title='UI/UX Introduction'>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
            </Expander>
            <Expander className='' title='UI/UX Introduction'>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
            </Expander>
            <Expander className='' title='UI/UX Introduction'>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video disabled'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
                <div className='lecture-video'>
                    <p className='lecture-video__name'>Bài 1: Giới thiệu tổng quan về Redux 🎉 (2020)</p>
                    <p className='lecture-video__duration'>00 : 00 : 00</p>
                </div>
            </Expander>
        </div>
    );
};