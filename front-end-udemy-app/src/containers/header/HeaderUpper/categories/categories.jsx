// @flow 
import React, { useState } from 'react';
import './style.scss';
export const Categories = (props) => {
    const [show, setShow] = useState(false);
    const [subMenuActive, setSubMenuActive] = useState(-1);

    const MouseEnterDropItem = (e) => {
        setSubMenuActive(+e.target.getAttribute('data-id'));
    }

    const handleRenderListDropdown = (dataDropdown) => {
        return (
            dataDropdown.map((cat, index) => {
                return (
                    <>
                        {
                            cat.isSubCategory === false &&
                            <li>
                                <a data-id={cat.id}
                                    href='#'
                                    className='dropdown-item'
                                >
                                    <p className='dropdown-item__title'>Lập trình Python</p>
                                </a>
                            </li>
                        }
                        {
                            cat.isSubCategory &&
                            <li className='dropdown-submenu'>
                                <a data-id={cat.id}
                                    href='#'
                                    className='dropdown-item'
                                    onMouseEnter={MouseEnterDropItem}
                                >
                                    <p className='dropdown-item__title'>{cat.categoryName}</p>
                                    <i className="fa fa-chevron-right dropdown-item__icon" aria-hidden="true" />
                                </a>

                                <ul className={`dropdown-menu ${(subMenuActive === cat.id) ? '' : 'hidden'}`}>
                                    {
                                        handleRenderListDropdown(cat.subCategory)
                                    }
                                </ul>

                            </li>
                        }
                    </>
                )
            })
        )
    }

    const handleMouseEnter = () => {
        setShow(true);
    }

    const handleMouseLeave = () => {
        setShow(false);
        setSubMenuActive(-1);
    }
    return (
        <div className='categories'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <p className={`categories__title ${show ? 'active' : ''}`} >Categories</p>
            <div className={`categories__body  ${show ? '' : 'hidden'}`} >
                <div className='dropdown'>
                    <ul className='dropdown-menu'>
                        {handleRenderListDropdown(dataSet)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const dataSet = [
    {
        id: 1,
        categoryName: 'Web học online MyEdu',
        isSubCategory: true,
        subCategory: [
            { id: 12, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 13, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 14, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 15, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 16, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 17, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 18, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 19, categoryName: 'Web học online MyEdu', isSubCategory: false },
        ],
    },
    {
        id: 2,
        categoryName: 'Web học online MyEdu',
        isSubCategory: true,
        subCategory: [
            { id: 21, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 27, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 26, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 25, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 24, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 23, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 22, categoryName: 'Web học online MyEdu', isSubCategory: false },
        ],
    },
    {
        id: 3,
        categoryName: 'Web học online MyEdu',
        isSubCategory: false,
        subCategory: [
            { id: 31, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 32, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 33, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 34, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 35, categoryName: 'Web học online MyEdu', isSubCategory: false },
        ],
    },
    {
        id: 4,
        categoryName: 'Web học online MyEdu',
        isSubCategory: true,
        subCategory: [
            {
                id: 41,
                categoryName: 'Web học online MyEdu', isSubCategory: false,
            },
            { id: 42, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 43, categoryName: 'Web học online MyEdu', isSubCategory: false },
            { id: 44, categoryName: 'Web học online MyEdu', isSubCategory: false },
        ],
    },
]