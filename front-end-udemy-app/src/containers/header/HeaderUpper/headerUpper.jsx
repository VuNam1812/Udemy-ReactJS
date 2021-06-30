// @flow
import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { Logo } from "../../../components";
import { Categories } from "./categories/categories";
import { UserAccount } from "./userAccount/userAccount";
import { authContext } from "../../../contexts/auth/authContext";
export const HeaderUpper = (props) => {
  const { store_auth } = useContext(authContext);
  const [sticky, setSticky] = useState({
    beginPos: props.offsetTop ? props.offsetTop : 0,
    text: "",
  });

  useEffect(() => {
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
    <div className={`header-upper ${props.className} ${sticky.text}`}>
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
            {store_auth.auth && (
              <UserAccount account={store_auth.account}></UserAccount>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
