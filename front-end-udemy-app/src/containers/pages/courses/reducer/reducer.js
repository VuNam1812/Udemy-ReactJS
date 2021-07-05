export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case COURSES_ACTION.INIT_DATA:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const COURSES_ACTION = {
  INIT_DATA: 0,
};
