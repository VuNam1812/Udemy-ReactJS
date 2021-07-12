export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case TEACHER_PROFILE_ACTION.INIT_DATA:
      return {
        ...state,
        account: {
          ...payload,
        },
      };
    case TEACHER_PROFILE_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };

    case TEACHER_PROFILE_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload],
      };
    default:
      return state;
  }
};

export const TEACHER_PROFILE_ACTION = {
  INIT_DATA: 0,
  UPDATE_ACTIVE: 1,
  UPDATE_COURSES: 2,
};
