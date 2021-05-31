// @flow 
import React, { useState } from 'react';
import './style.scss';
import { Logo } from '../../../components';
import { Categories } from './categories/categories';
export const HeaderUpper = (props) => {
    return (
        <div className='header-upper'>
            <div className='wrap'>
                <Logo></Logo>
                <div className='header-upper__nav-search'>
                    <Categories></Categories>
                    <div className='navigation'>
                        <div className='search'>
                            <input placeholder='What do you want to search?' className='search__input' />
                            <div className='search__button'>
                                <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};