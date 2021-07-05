// @flow 
import React from 'react';
import './style.scss'
import numeral from 'numeral';
export const TopCategory = (props) => {
    return (
        <div className='top-categories'>
            <div className='wrap'>
                <div className='top-categories__body'>
                    <div className='body-group'>
                        {
                            props.cats.map(cat => {
                                return (
                                  <div key={cat.id} className="body-item">
                                    <div
                                      className="body-item__image"
                                      style={{
                                        backgroundImage: `url(${
                                          "http://localhost:3030/" +
                                          cat.srcImage.replaceAll("\\", "/")
                                        })`,
                                      }}
                                    ></div>
                                    <div className="body-item__content">
                                      <p className="body-item__content-cat-name">
                                        {cat.catName}
                                      </p>
                                      <p className="body-item__content-joiner">
                                        ({numeral(cat.joinerCount).format('0,0')}) Người đăng ký
                                      </p>
                                    </div>
                                  </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};