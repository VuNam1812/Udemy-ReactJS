export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case HOME_ACTION.INIT_DATA:
      return {
        ...state,
        topNew: [...state.topNew, ...payload.topNew],
        topView: [...state.topView, ...payload.topView],
        topRate: [...state.topRate, ...payload.topRate],
      };
    case HOME_ACTION.UPDATE_TOPCAT:
      return {
        ...state,
        topCats: [...state.topCats, ...payload.topJoin],
      };
    default:
      return state;
  }
};

export const HOME_ACTION = {
  INIT_DATA: 0,
  UPDATE_TOPCAT: 1,
};
