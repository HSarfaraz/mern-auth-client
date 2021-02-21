import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE', response);
            const { role, name, email } = response.data;
            setValues({ ...values, role, name, email });
        })
        .catch(error => {
            console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
            if (error.response.status === 401) {
                signout(() => {
                    history.push('/');
                });
            }
        });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
            updateUser(response, ()=>{
                setValues({ ...values, buttonText: 'Submitted' });
                toast.success('Profile update successfully');
            })
        })
        .catch(error => {
            console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled style={{cursor:'not-allowed'}}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled style={{cursor:'not-allowed'}}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div className="form-group">
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="justify-content-center container col-sm-4">
                <ToastContainer />
                <h1 className="pt-5 pb-0">Profile Update</h1>
                <p className="badge badge-primary mb-5">Admin</p>
                {updateForm()}
            </div>
        </Layout>
    );
};

export default Admin;
