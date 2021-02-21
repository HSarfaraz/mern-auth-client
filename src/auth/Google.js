import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = ({informParent = f => f})=>{

    const responseGoogle = (response) => {
        console.log(response.tokenId);
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/google-login`,
            data: {idToken: response.tokenId}
        })
        .then(response =>{
            console.log('GOGGLE SIGNIN SUCCESS', response);
            //Inform the parent component 
            informParent(response);           
        })
        .catch(error =>{
            console.log('GOOGLE SIGNIN ERROR', error.response);
        })
    }

    return(
        <div className="pb-3">
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button className="btn btn-xs btn-block btn-outline-info" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fa fa-google pl-3 pr-3" aria-hidden="true"> </i>
                        Login with Google
                    </button>
                )}
                // buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}                
            />
        </div>
    )
};

export default Google;
