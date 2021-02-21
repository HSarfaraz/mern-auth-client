import React from 'react';
//import FacebookLogin from 'react-facebook-login'; //import in case we need defualt facebook button styling
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Facebook = ({informParent = f => f})=>{

    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/facebook-login`,
            data: {userID:response.userID, accessToken: response.accessToken}
        })
        .then(response =>{
            console.log('FACEBOOK SIGNIN SUCCESS', response);
            //Inform the parent component 
            informParent(response);           
        })
        .catch(error =>{
            console.log('FACEBOOK SIGNIN ERROR', error.response);
        })
     }

    return(
        <div className="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-xs btn-block btn-outline-info" >
                        <i className="fa fa-facebook pl-3 pr-3" aria-hidden="true"> </i>
                        Login with Facebook
                    </button>
                )}
            />
        </div>
    )
};

export default Facebook;
