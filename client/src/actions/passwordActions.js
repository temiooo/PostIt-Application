import axios from 'axios';
import toastr from 'toastr';
import { beginAjaxCall, ajaxCallSuccess,
  ajaxCallError } from './ajaxStatusActions';

const forgotPassword = email => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
    .put('/api/user/forgotpassword', email)
    .then((response) => {
      dispatch(ajaxCallSuccess());
      toastr.info(response.data.message);
    })
    .catch((error) => {
      dispatch(ajaxCallError());
      toastr.error(error.response.data.message);
    });
};

const resetPassword = (resetToken, password) => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
    .put(`api/user/resetpassword/${resetToken}`, password)
    .then((response) => {
      dispatch(ajaxCallSuccess());
      toastr.success(response.data.message);
    })
    .catch((error) => {
      dispatch(ajaxCallError());
      toastr.error(error.response.data.message);
    });
};

export { forgotPassword, resetPassword };
