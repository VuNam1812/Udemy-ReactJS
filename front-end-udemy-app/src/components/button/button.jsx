// @flow 
import * as React from 'react';
import './style.scss';
export const Button = (props) => {
    return (
        <div className={`button ${props.className}`} onClick={props.onClick}>

            <div className='button__clip-path-background' />
            <div className='button__clip-path-color' />
            <div className='btn-body'>
                <p className='btn-body__content'>{props.content}</p>
                {props.children}
            </div>
        </div>
    );
};