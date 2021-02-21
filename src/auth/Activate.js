import React, {useState, useEffect} from 'react';
//import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

//We got match from Browser routes
const Activate = ({match})=>{
    const [values, setValues] = useState({
        name: '', // Decode token to take name
        token: '',
        show: true,
      });

      //To get the token
      //Whenever the state change this method will run
      useEffect(() => {
        //console.log('state is changed');
        let token = match.params.token;
        //Decode the token
        let {name} = jwt.decode(token);
        //console.log(token);
        if(token){
            setValues({...values,name, token})
        }
      }, []);

    const {name, token, show} = values;

    const clickSubmit = event => {
        event.preventDefault(); //To vaoid the page reload
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/account-activation`,
            data:{ token }
        })
        .then(response =>{
            console.log('Account Activation Success', response);
            setValues({...values, show:false});
            toast.success(response.data.message);
        })
        .catch(error=>{
            console.log('Account Activation error', error.response.data.error);
            toast.error(error.response.data.error);
        });
    };

    const activationLink = () =>(
        <div className="text-center">
            <h1 className="pt-5 pb-2">Hey {name}, Ready to Activate your account</h1>
            <button className="btn btn-outline-primary btn-block" onClick={clickSubmit}>Activate Account</button>
        </div>
    )
    return(
        <Layout>
            <div className="justify-content-center container col-sm-4">
                {/* {JSON.stringify({name,email,password})} */}
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    );
};

export default Activate;
