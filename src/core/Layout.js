import React, {Fragment} from 'react';
import {isAuth, signout} from '../auth/helpers'
import {Link, withRouter} from 'react-router-dom';

const Layout = ({children, history,match}) =>{

    //isActive function : To give active tab color
    const isActive = path => {
        //if(history.location.pathname === path){
        if(match.path === path){
            return {backgroundColor:'#fff',borderColor:'#fff',color: '#e95420'} // Active link
        }else{
            return {color: '#fff'}
        }
    };

    const nav = () =>(
            
        <ul className="nav nav-tabs bg-primary p-2">
            <li className="nav-item">
                <Link to="/" className="nav-link rounded" style={isActive('/')}>
                     {/* / {JSON.stringify(history)} */}
                     {/* {JSON.stringify(history.location.pathname)} */}
                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </Link>
            </li>

            {/* If not authenticate */}
            {!isAuth() && (
                <Fragment>
                    <li className="nav-item ml-auto mr-2">
                        <Link to="/signin" className="nav-link rounded" style={isActive('/signin')}> <i className="fa fa-sign-in" aria-hidden="true"></i> SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link rounded" style={isActive('/signup')}> <i className="fa fa-user-plus" aria-hidden="true"></i>  SignUp</Link>
                    </li>    
                </Fragment>       
            )}

            {/* Show username when signin */}
            {/* If the user is admin */}
            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto mr-2">
                    <Link to="/admin" className="nav-link rounded" style={isActive('/admin')}>
                        <i className="fa fa-user-circle" aria-hidden="true"> </i> 
                        &nbsp; {isAuth().name}
                    </Link>
                </li> 
            )}

            {/* If the user is subscriber */}
            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item ml-auto mr-2">
                    <Link to="/private" className="nav-link rounded" style={isActive('/private')}>
                        <i className="fa fa-user-circle" aria-hidden="true"> </i> 
                        &nbsp; {isAuth().name}
                    </Link>
                </li> 
            )}

            {/* If user is authenticated, show signout link, once it is signout , take to the home page */}
            {isAuth() && (
                <li className="nav-item">
                    <span className="nav-link rounded" style={{cursor:'pointer', color: '#fff'}} onClick={()=>{
                        signout(()=>{
                            history.push('/')
                        })
                    }}><i className="fa fa-sign-out" aria-hidden="true"></i> SignOut</span>
                </li> 
            )}



        </ul>

    )

    return(
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
};

export default withRouter(Layout);
