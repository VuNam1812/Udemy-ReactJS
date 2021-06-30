export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case AUTH_ACTION.UPDATE_AUTH:
      return {
        ...state,
        auth: payload,
      };
    case AUTH_ACTION.UPDATE_ACCOUNT:
      let role = "";
      switch (+payload.role) {
        case 0:
          role = "Quản trị viên";
          break;
        case 1:
          role = "Giảng viên";
          break;
        case 2:
          role = "Học viên";
          break;
        default:
          break;
      }
      return {
        ...state,
        account: {
          ...state.accounts,
          username: payload.username,
          role: role,
          permission: payload.role,
          imgSrc: payload.imgSrc.replaceAll("\\", "/"),
        },
      };
    default:
      return state;
  }
};

export const AUTH_ACTION = {
  UPDATE_AUTH: 1,
  UPDATE_ACCOUNT: 2,
};
