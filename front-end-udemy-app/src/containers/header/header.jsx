// @flow 
import * as React from 'react';
import { HeaderTop } from './HeaderTop/headerTop';
import { HeaderUpper } from './HeaderUpper/headerUpper';
export const Header = (props) => {
    return (
        <div className='header'>
                <HeaderTop></HeaderTop>
                <HeaderUpper></HeaderUpper>
        </div>
    );
};