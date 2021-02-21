import React, {useState} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = ({history})=>{
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request Password Link'
      });

    const {email, buttonText} = values;

    const handleChange = (name) => (event) =>{
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault(); //To vaoid the page reload
        setValues({...values, buttonText: 'Submitting'})
        //console.log('send request');
        axios({
            method:'PUT',
            url:`${process.env.REACT_APP_API}/forgot-password`,
            data:{ email}
        })
        .then(response =>{
            console.log('Forgot password Success', response);
            toast.success(response.data.message);
            setValues({...values, buttonText: 'Requested'});
        })
        .catch(error=>{
            console.log('Forgot password error', error.response.data.error);
            toast.error(error.response.data.error);
            setValues({...values, buttonText: 'Submit'});
        });
    }

    //Create the form
    const passwordForgotForm = ()=>(
        <form>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input type="email" onChange={handleChange('email')} value={email} className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </form>
    );

   
    
    return(
        <Layout>
            <div className="justify-content-center container col-sm-4">
                <ToastContainer />
                <h1 className="pt-5 pb-2">Forgot Password</h1>
                {passwordForgotForm()}
            </div>
        </Layout>
    )
};

export default Forgot;
