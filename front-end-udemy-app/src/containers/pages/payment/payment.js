// @flow
import React, { useReducer } from "react";
import "./style.scss";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";

import { ProcessBar } from "./processBar/processBar";
import { ConfirmCourse } from "./confirmCourse/confirmCourse";
import { CompletePayment } from "./completePayment/completePayment";

import { reducer, PAY_ACTION } from "./reducer/reducer";

const initData = {
  active: 1,
  course: {},
  user: {},
};

export const Payment = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  return (
    <div className="payment">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="payment-body">
        <div className="wrap">
          <ProcessBar active={store.active}></ProcessBar>
          <div className={`payment-body active--${store.active}`}>
            <ConfirmCourse dispatch={dispatch}></ConfirmCourse>
            <CompletePayment></CompletePayment>
          </div>
        </div>
      </div>
    </div>
  );
};
