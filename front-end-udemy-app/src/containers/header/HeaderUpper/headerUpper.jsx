// @flow
import React, { useState, useEffect, useContext, useRef } from "react";
import "./style.scss";
import { Logo } from "../../../components";
import { Categories } from "./categories/categories";
import { UserAccount } from "./userAccount/userAccount";
import { authContext } from "../../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";
export const HeaderUpper = (props) => {
  const headerUpper = useRef();
  const [height, setHeight] = useState(0);
  const history = useHistory();
  const { store_auth } = useContext(authContext);
  const [sticky, setSticky] = useState({
    beginPos: props.offsetTop ? props.offsetTop : 0,
    text: "",
  });

  useEffect(() => {
    setHeight(+headerUpper.current.offsetHeight);
    window.addEventListener("scroll", () => {
      if (window.scrollY > sticky.beginPos && sticky.text != "sticky") {
        setSticky({
          ...sticky,
          text: "sticky",
        });
      }
      if (window.scrollY <= sticky.beginPos) {
        setSticky({
          ...sticky,
          text: "",
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > sticky.beginPos && sticky.text != "sticky") {
          setSticky({
            ...sticky,
            text: "sticky",
          });
        }
        if (window.scrollY <= sticky.beginPos) {
          setSticky({
            ...sticky,
            text: "",
          });
        }
      });
    };
  }, []);

  return (
    <>
      <div
        className={`header-upper-cover ${sticky.text}`}
        style={{ height: `${height}px` }}
      ></div>
      <div
        className={`header-upper ${props.className} ${sticky.text}`}
        ref={headerUpper}
      >
        <div className="wrap">
          <Logo
            className="header-upper__logo"
            onClick={() => {
              history.push("/");
            }}
          ></Logo>
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
              {store_auth.auth && (
                <UserAccount account={store_auth.account}></UserAccount>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
