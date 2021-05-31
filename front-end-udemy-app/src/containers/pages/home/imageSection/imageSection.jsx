// @flow 
import * as React from 'react';

import { Button } from '../../../../components';

import './style.scss';
export const ImageSection = (props) => {
    return (
        <div className='image-section'>
            <div className='wrap'>
                <div className='image-section__body'>
                    <h2 className='image-section__title'>We're waiting for you to join us</h2>
                    <Button className='btn-afer-rounded'><i class="fa fa-sign-in fa-2x" aria-hidden="true"></i></Button>
                </div>
            </div>
        </div>
    );
};