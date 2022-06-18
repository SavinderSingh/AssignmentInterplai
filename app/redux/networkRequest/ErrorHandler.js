import { showAlert } from "../../utils/Message";

export const errorHandler = (error) => {

    console.log('[Errorhandler.js] Error handler called',error.message)

    const status = (error.response !== undefined || error.response !== null) ? error.response.status : null;
    
    if(status !== null && status === 401){
        const response = error.response.data;

        if(typeof response === 'object'){
            showAlert('error',response.msg);
        }else {
            showAlert('error',response);
        }
    }else {
        if(error.message === 'Network Error'){
            showAlert('error','Network or Server Error');
        }else{
            showAlert('error',error.message);
        }
    }
}


export const responseErrorhandler = (error,props) => {
    if(!error.success){
        if(typeof error.msg === 'string'){
            showAlert('error',error.msg);
        }else{
            handleSessionExpired(error,props)
        }
    }
}


// export const sessionErrorHandler = (response,props,dispatch) => {
//     if(response.error !== undefined && response.error){
//         if(response.msg===''){
//             showAlert('error',response.msg)
//             clearUserPrefs()
//             dispatch(setLogoutUser())
//             props.navigation.goBack()
//         }
//     }
// }


export const handleSessionExpired = (response,props,dispatch) => {
    if(response.error !== undefined && response.error){
        if(response.msg==='Session expired, please login again' || response.msg==='Session not valid, Please login again'){
            showAlert('error',response.msg)
            // dispatch(setLogoutUser())
            props.navigation.replace('LoginWithOTP')
        }
    }
}