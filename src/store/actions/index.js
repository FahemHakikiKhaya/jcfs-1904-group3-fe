export const loginAction = ({ id, username, role, token, dispatch }) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({ id, username, role, token })
  );
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: { id, username, role, token },
  });
};

export const keepLoginAction = ({ id, username, role, dispatch }) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: { id, username, role },
  });
};

export const logoutAction = () => {
  localStorage.removeItem("userData");
  return {
    type: "LOGOUT_SUCCESS",
  };
};
