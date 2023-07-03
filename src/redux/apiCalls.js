import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { getMegaMenuFailure, getMegaMenuStart, getMegaMenuSuccess } from "./MegaMenuRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/v1/user/auth/login", user);
    dispatch(loginSuccess(res.data.body.access_token));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//////////maga menu////////////////
export const getMegaMenu = async (dispatch) => {
  dispatch(getMegaMenuStart());
  try {
    const res = await publicRequest.get(`/api/v1/user/site/menus/mega`);
    // console.log(res.data.body);
    dispatch(getMegaMenuSuccess(res.data.body));
  } catch (err) {
    dispatch(getMegaMenuFailure());
  }
};
///////////////////////////////////////////