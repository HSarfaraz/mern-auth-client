import React, {useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {authenticate, isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify';
import Google from './Google'
import Facebook from './Facebook'
import 'react-toastify/dist/ReactToastify.min.css'

const Signin = ({history})=>{
    const [values, setValues] = useState({
        email: "msg.sarfaraz@gmail.com",
        password: "Momsblessing8$",
        buttonText: "Submit"
      });

    const {email, password, buttonText} = values;

    const informParent = response => {
        authenticate(response, ()=>{
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        })
    }

    const handleChange = (name) => (event) =>{
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault(); //To vaoid the page reload
        setValues({...values, buttonText: 'Submit'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/signin`,
            data:{ email, password}
        })
        .then(response =>{
            console.log('Signin Success', response);

            //save the response(user, token) in localstorage/cookie(more safe)
            authenticate(response, ()=>{
                setValues({...values, email:'',password:'', buttonText: 'Submitted'});
                //toast.success(`Hey ${response.data.user.name}, Welcome back`);
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            })
        })
        .catch(error=>{
            console.log('Signin error', error.response.data.error);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        });
    }

    //Create the form
    const signinForm = ()=>(
        <form>
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
            {/* {JSON.stringify(isAuth())} */}
            <div className="justify-content-center container col-sm-8 col-xs-3 col-md-4">
                {/* {JSON.stringify({name,email,password})} */}
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className="pt-5 pb-2">Signin</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                {signinForm()}
                <br/>
                <Link to="/auth/password/forgot" className="small">Forgot Password</Link>
            </div>
        </Layout>
    )
};

export default Signin;
