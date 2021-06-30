// @flow
import React, { useState, useContext } from "react";
import "./style.scss";
import { categoryContext } from "../../../../contexts/categories/categoryContext";
export const Categories = (props) => {
  const { store_cat } = useContext(categoryContext);
  const [show, setShow] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(-1);

  const MouseEnterDropItem = (e) => {
    setSubMenuActive(+e.target.getAttribute("data-id"));
  };
  const mouseEnterHiddenItem = (e) => {
    const index = +e.currentTarget.getAttribute("data-id");
    const cat_target = store_cat.data.find((value) => value.id === index);
    if (cat_target) {
      cat_target.id_parentCat === 0 && setSubMenuActive(-1);
    }
  };
  const handleRenderListDropdown = (dataDropdown) => {
    return dataDropdown.map((cat) => {
      return (
        <>
          {cat.isSubCategory === false && (
            <li>
              <a
                data-id={cat.id}
                href="#"
                className="dropdown-item"
                onMouseEnter={mouseEnterHiddenItem}
              >
                <p className="dropdown-item__title">{cat.catName}</p>
              </a>
            </li>
          )}
          {cat.isSubCategory && (
            <li className="dropdown-submenu">
              <a
                data-id={cat.id}
                href="#"
                className="dropdown-item"
                onMouseEnter={MouseEnterDropItem}
              >
                <p className="dropdown-item__title">{cat.catName}</p>
                <i
                  className="fa fa-chevron-right dropdown-item__icon"
                  aria-hidden="true"
                />
              </a>

              <ul
                className={`dropdown-menu ${
                  subMenuActive === cat.id ? "" : "hidden"
                }`}
              >
                {handleRenderListDropdown(cat.subCategory)}
              </ul>
            </li>
          )}
        </>
      );
    });
  };

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
    setSubMenuActive(-1);
  };
  return (
    <div
      className="categories"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className={`categories__title ${show ? "active" : ""}`}>Categories</p>
      <div className={`categories__body  ${show ? "active" : ""}`}>
        <div className="dropdown">
          <ul className="dropdown-menu">
            {store_cat.data && handleRenderListDropdown(store_cat.data)}
          </ul>
        </div>
      </div>
    </div>
  );
};

const dataSet = [
  {
    id: 1,
    catName: "Web học online MyEdu",
    isSubCategory: true,
    subCategory: [
      { id: 12, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 13, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 14, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 15, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 16, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 17, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 18, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 19, catName: "Web học online MyEdu", isSubCategory: false },
    ],
  },
  {
    id: 2,
    catName: "Web học online MyEdu",
    isSubCategory: true,
    subCategory: [
      { id: 21, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 27, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 26, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 25, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 24, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 23, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 22, catName: "Web học online MyEdu", isSubCategory: false },
    ],
  },
  {
    id: 3,
    catName: "Web học online MyEdu",
    isSubCategory: false,
    subCategory: [
      { id: 31, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 32, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 33, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 34, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 35, catName: "Web học online MyEdu", isSubCategory: false },
    ],
  },
  {
    id: 4,
    catName: "Web học online MyEdu",
    isSubCategory: true,
    subCategory: [
      {
        id: 41,
        catName: "Web học online MyEdu",
        isSubCategory: false,
      },
      { id: 42, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 43, catName: "Web học online MyEdu", isSubCategory: false },
      { id: 44, catName: "Web học online MyEdu", isSubCategory: false },
    ],
  },
];
