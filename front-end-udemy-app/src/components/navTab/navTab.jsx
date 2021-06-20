// @flow
import React, { useState } from "react";
import "./style.scss";
export const NavTab = ({ headers, blocks, className }) => {
  const [left, setLeft] = useState(0);
  const [active, setActive] = useState([
    "active",
    ...new Array(headers.length).fill(""),
  ]);

  const handleTab = (e) => {
    const index = +e.target.getAttribute("data-id");
    const distance = 100 / headers.length;
    setLeft(index * distance);
    const newActive = new Array(headers.length).fill("");
    newActive[index] = "active";
    setActive(newActive);
  };
  return (
    <div className={`nav-tabs ${className}`}>
      <ul className="nav-tabs__header">
        <li
          className="nav-tabs__header-item tab-indicator"
          style={{ left: `${left}%`, width: `${100 / headers.length}%` }}
        ></li>
        {headers.map((text, index) => {
          return (
            <li
              data-id={index}
              className={`nav-tabs__header-item ${active[index]}`}
              onClick={handleTab}
            >
              {text}
            </li>
          );
        })}
      </ul>
      <div className="nav-tabs__content">
        {blocks.map((block, index) => {
          return (
            <div className={`nav-tabs__content-item ${active[index]}`}>
              {block}
            </div>
          );
        })}
      </div>
    </div>
  );
};
