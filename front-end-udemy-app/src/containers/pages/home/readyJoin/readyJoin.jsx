// @flow 
import * as React from 'react';
import './style.scss'
import { Button } from '../../../../components';

export const ReadyJoin = (props) => {
    return (
        <div className='ready-join'>
            <div className='clip-path'>
            </div>
            <div className='ready-join__content'>
                <div className='wrap'>
                    <p className='ready-join__content-title'>Ready to get started?</p>
                    <p className='ready-join__content-desc'>Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two
    waters own morning gathered greater shall had behold had seed.</p>
                    <div className='btn-group'>
                        <Button className='btn--hover-vertical-change-color' content='Get Started'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
                        <Button className='btn--color-white btn--hover-vertical-change-color-reverse' content='All Courses'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};