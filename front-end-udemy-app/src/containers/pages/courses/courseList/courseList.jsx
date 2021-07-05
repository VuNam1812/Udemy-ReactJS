// @flow 
import React, { useState, useEffect } from 'react';
import './style.scss';
import imageCourse from '../../../../public/image/course_1.jpg';
import { Button, Checkbox, Select } from '../../../../components';
export const CourseList = (props) => {
    const [limit, setLimit] = useState(9);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        setupPagination(37);
    }, [])
    
    const handlePagination = (e) => {
        const index = +e.target.getAttribute('data-id');
        const newPagination = [...pagination];
        newPagination.forEach((ele) => {
            ele.active = (+index === +ele.id) ? 'pagination__item--active' : ''
        })
        setPagination(newPagination);
    }
    const setupPagination = (length) => {
        const subPage = (length % limit > 0) ? 1 : 0;
        const numPage = parseInt(length / limit) + subPage;
        const object = [];
        for (let index = 1; index <= numPage; index++) {
            object.push({
                id: index,
                active: (+index === 1) ? 'pagination__item--active' : ''
            });
        }
        setPagination(object);
    }
    return (
      <div className="course-list">
        <p className="course-list__header">
          Tất cả khóa học {props.title && `của ${props.search ? 'từ khóa' : 'danh mục'} "${props.title}"`}
        </p>
        <div className="course-list__content">
          <div className="body-list">
            <div className="body-list__filter">
              <Select
                data={dataSet_filter}
                className="body-list__filter-select select--bottom select--shadow"
                defaultSelected="---------- Bộ lọc ----------"
              ></Select>
              <div className="btn-filter-list">
                <Button className="btn--color-white btn--square">
                  <i className="fa fa-th-list" aria-hidden="true"></i>
                </Button>
                <Button className="btn--color-white btn--square">
                  <i className="fa fa-th-large" aria-hidden="true"></i>
                </Button>
              </div>
            </div>
            <div className="body-list__content">
              <div className="courses">
                {dataSet_Course.map((course) => {
                  return (
                    <div className="courses-item">
                      <div className="cover-image">
                        <div
                          className="courses-item__image"
                          style={{ backgroundImage: `url(${imageCourse})` }}
                        ></div>
                      </div>
                      <div className="courses-item__body">
                        <div className="courses-item__title">
                          <div className="title-main">
                            <h3 className="title-main__course-name">
                              {course.courseName}
                            </h3>
                            <h3 className="title-main__course-price">
                              $ {course.coursePrice}
                            </h3>
                          </div>
                          <p className="courses-item__title-desc">
                            {course.courseMiniDesc}
                          </p>
                        </div>
                        <div className="courses-item__enroll-btn">
                          <h3 className="lecture-count">
                            {course.lectureCount} Bài giảng
                          </h3>
                          <Button
                            className="btn-smaller btn--hover-change-color"
                            content="Enroll now"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pagination">
                {pagination.map((item) => {
                  return (
                    <div
                      data-id={item.id}
                      className={`pagination__item ${item.active}`}
                      onClick={handlePagination}
                    >
                      {item.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="filter-by">
            <p className="filter-by__header">Filter by</p>
            <div className="filter-by__content">
              {dataSet_filterBy.map((item, index) => {
                return (
                  <div key={index} className="content-items">
                    <p className="content-items__title">{item.title}</p>
                    <div className="content-items__body">
                      {item.items.map((itemFilter, indexItem) => {
                        return (
                          <label
                            key={indexItem}
                            className="content-items__body-item"
                          >
                            <Checkbox className="checkbox-basic"></Checkbox>
                            {itemFilter.name} <span> ({itemFilter.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
};

const dataSet_filterBy = [
    {
        title: 'Skill Level', items: [
            { name: 'All Level', count: '31.000' },
            { name: 'Beginner', count: '21.000' },
            { name: 'Intermediate', count: '11.000' },
            { name: 'Expert', count: '12.000' },
        ]
    },
    {
        title: 'Ratings', items: [
            { name: '3 Star & Up', count: '11.000' },
            { name: '4 Star & Up', count: '12.000' },
            { name: '5 Star & Up', count: '32.000' },
        ]
    },
    {
        title: 'Duration', items: [
            { name: '0-3 Hours', count: '11.000' },
            { name: '3-6 Hours', count: '12.000' },
            { name: '6-17 Hours', count: '3.000' },
            { name: '17+ Hours', count: '2.000' },
        ]
    },
    {
        title: 'Language', items: [
            { name: 'English', count: '11.000' },
            { name: 'Português', count: '12.000' },
            { name: 'Español', count: '3.000' },
            { name: 'Deutsch', count: '2.000' },
            { name: '日本語', count: '2.000' },
        ]
    },
    {
        title: 'Subtitles', items: [
            { name: 'English', count: '11.000' },
            { name: 'Português', count: '12.000' },
            { name: 'Español', count: '3.000' },
            { name: 'Deutsch', count: '2.000' },
            { name: '日本語', count: '2.000' },
        ]
    },
]

const dataSet_Course = [
    { id: 1, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 2, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 3, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 4, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 5, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 6, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 7, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 8, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },
    { id: 9, courseName: 'Our top courses', courseMiniDesc: 'Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered. Get Stared', coursePrice: 140, lectureCount: 12 },

];

const dataSet_filter = [
    '---------- Bộ lọc 1----------',
    '---------- Bộ lọc 2----------',
    '---------- Bộ lọc 3----------',
    '---------- Bộ lọc 4----------',
    '---------- Bộ lọc 5----------',
    '---------- Bộ lọc 6----------',
    '---------- Bộ lọc 7----------',
    '---------- Bộ lọc 8----------',
]