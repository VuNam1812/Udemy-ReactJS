// @flow 
import * as React from 'react';
import './style.scss';
import { Button } from '../../../../../components';
export const TopBanner = (props) => {
    return (
        <div className='top-banner'>
            <h1 className='top-banner__title'>Learn Math, Science, English And Test <br></br>
                            Prep From Our Experts</h1>
            <div className='btn-group'>
                <Button className='btn--hover-vertical-change-color' content='Get Started'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
                <Button className='btn--color-white btn--hover-vertical-change-color-reverse' content='All Courses'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
            </div>
        </div>
    );
};