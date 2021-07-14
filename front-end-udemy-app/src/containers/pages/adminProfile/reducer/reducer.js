export const ADMIN_PROFILE_ACTION = {
  ACTIVE_DASHBOARD: 1,
  ACTIVE_COURSES: 2,
  ACTIVE_CATEGORIES: 3,
  ACTIVE_ACCOUNTS: 4,
  UPDATE_ACCOUNT: 5,
  UPDATE_AVATAR_ACCOUNT: 6,
  UPDATE_COURSES: 7,
  UPDATE_TEACHERS: 8,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_PROFILE_ACTION.ACTIVE_DASHBOARD:
      return {
        ...state,
        currectActive: 1,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_COURSES:
      return {
        ...state,
        currectActive: 2,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_CATEGORIES:
      return {
        ...state,
        currectActive: 3,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_ACCOUNTS:
      return {
        ...state,
        currectActive: 4,
      };

    case ADMIN_PROFILE_ACTION.UPDATE_ACCOUNT:
      return {
        ...state,
        account: {
          ...payload,
        },
      };

    case ADMIN_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          srcImage: payload,
        },
      };

    case ADMIN_PROFILE_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload],
      };
    case ADMIN_PROFILE_ACTION.UPDATE_TEACHERS:
      return {
        ...state,
        teachers: [...payload],
      };
    default:
      return state;
  }
};
