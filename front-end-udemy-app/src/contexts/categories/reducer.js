export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case CAT_ACTION.INIT:
          return {
              ...state,
              data: [...payload]
          };

    default:
      return state;
  }
};

export const CAT_ACTION = {
  INIT: 1,
};
