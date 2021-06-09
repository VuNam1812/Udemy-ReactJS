import './style.scss';
import React, { useState, useEffect } from 'react';

export const Expander = (props) => {
    const [active, setActive] = useState((props.className === 'active')? '' : 'active');
    const activeExpander = () => {
        const activeValue = (active === '') ? 'active' : '';
        setActive(activeValue);
    }
    useEffect(() => {
        activeExpander();
    }, [props.className])
    return (
        <div className='expander'>
            <div className={`expander__title ${active}`} onClick={activeExpander}>
                <p>{props.title}</p>
                <div className='show-more-button'>
                    <div className='animated-button'>
                        <div className='bar bar1'></div>
                        <div className='bar'></div>
                    </div>
                </div>
            </div>
            <div className={`expander__content ${active}`}>
                <div className='expander__content-children'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};