// @flow
import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { Logo } from "../../../components";
import { Categories } from "./categories/categories";
import $ from "jquery";
export const HeaderUpper = (props) => {
  const header = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      header.current.classList.toggle("sticky", window.scrollY > 0);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`header-upper ${props.className}`} ref={header}>
      <div className="wrap">
        <Logo className="header-upper__logo"></Logo>
        <div className="header-upper__nav-search">
          <Categories></Categories>
          <div className="navigation">
            <div className="search">
              <input
                placeholder="What do you want to search?"
                className="search__input"
              />
              <div className="search__button">
                <i className="fa fa-search fa-lg" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
