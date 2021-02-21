import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = ()=>{
    const [values, setValues] = useState({
        name: "sarfaraz",
        email: "msg.sarfaraz@gmail.com",
        password: "Momsblessing8$",
        buttonText: "Submit"
      });

    const {name, email, password, buttonText} = values;

    const handleChange = (name) => (event) =>{
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault(); //To vaoid the page reload
        setValues({...values, buttonText: 'Submit'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/signup`,
            data:{name, email, password}
        })
        .then(response =>{
            console.log('Signup Success', response);
            setValues({...values, name:'',email:'',password:'', buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error=>{
            console.log('Sign up error', error.response.data.error);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        });
    }

    //Create the form
    const signupForm = ()=>(
        <form>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input type="text" onChange={handleChange('name')} value={name} className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input type="email" onChange={handleChange('email')} value={email} className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input type="password" onChange={handleChange('password')} value={password} className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </form>
    );

   
    
    return(
        <Layout>
            <div className="justify-content-center container col-sm-8 col-xs-3 col-md-4">
                {/* {JSON.stringify({name,email,password})} */}
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="pt-5 pb-2">Signup</h1>
                {signupForm()}
                <br/>
                <span className="mt-2 small">Already have an account?</span><Link to="/signin" className="small pl-2">Signin</Link>          
            </div>
        </Layout>
    )
};

export default Signup;
