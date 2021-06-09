// @flow 
import * as React from 'react';
import './style.scss';

export const Logo = (props) => {
    return (
        <div className={`logo ${props.className}`}>
            <i className="fa fa-eercast fa-3x logo__icon" aria-hidden="true"></i>
            <p className='logo__name'>My<span className='color--main'>Edu</span></p>
        </div>
    );
};