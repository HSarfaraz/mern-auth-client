import React, {useState,useEffect} from 'react';
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const Reset = ({match})=>{ //from props.math which is from react-router-dom
    const [values, setValues] = useState({
        name: '',
        token:'',
        newPassword:'',
        buttonText: 'Reset Password'
      });

    //As soon as component mount grab the user
    useEffect(() =>{
        let token = match.params.token;
        let {name} = jwt.decode(token)

        //update the state
        if(token){
            setValues({...values, name, token})
        }
    }, [])
    const {name,token,newPassword, buttonText} = values;

    const handleChange =  (event) =>{
        //console.log(event.target.value)
        setValues({...values, newPassword: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault(); //To vaoid the page reload
        setValues({...values, buttonText: 'Submitting'})
        //console.log('send request');
        axios({
            method:'PUT',
            url:`${process.env.REACT_APP_API}/reset-password`,
            data:{ newPassword, resetPasswordLink:token}
        })
        .then(response =>{
            console.log('Reset password Success', response);
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Done'});
        })
        .catch(error=>{
            console.log('Reset password error', error.response.data.error);
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Reset Password'});
        });
    }

    //Create the form
    const passwordResetForm = ()=>(
        <form>
            <div className="form-group">
              <label className="text-muted">New password</label>
              <input type="password" onChange={handleChange} value={newPassword} className="form-control" placeholder="Type new password" required/>
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </form>
    );

   
    
    return(
        <Layout>
            <div className="justify-content-center container col-sm-4">
                <ToastContainer />
                <h1 className="pt-5 pb-2">Hey {name}, Reset your Password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    )
};

export default Reset;
