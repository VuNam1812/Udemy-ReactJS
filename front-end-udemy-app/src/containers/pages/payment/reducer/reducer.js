export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case PAY_ACTION.INIT_DATA:
      return {
        ...state,
      };
    case PAY_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };
    default:
      return state;
  }
};

export const PAY_ACTION = {
  INIT_DATA: 0,
  UPDATE_ACTIVE: 1,
};
