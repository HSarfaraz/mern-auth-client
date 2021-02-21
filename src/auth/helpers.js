import cookie from 'js-cookie';

//Set in cookie
export const setCookie = (key, value)=>{ //KEY: What name u want to give to cookie
    if(window !== 'undefined'){
        cookie.set(key, value,{
            expires:1
        })
    }
}

//remove from cookie
export const removeCookie = (key)=>{ //KEY: What name u want to give to cookie
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires:1
        })
    }
}


//get from cookie such as stored token
//will be useful when we need to make request to server with token
export const getCookie = (key)=>{ //KEY: What name u want to give to cookie
    if(window !== 'undefined'){
       return cookie.get(key)
    }
}

//set in localstorage
export const setLocalStorage = (key, value)=>{ //KEY: What name u want to give to cookie
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = (key)=>{ //KEY: What name u want to give to cookie
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//authenticate user by passing data to cookie and local storage during signin
//work like a middleware
export const authenticate = (response, next) => {
    console.log('Authenticate helper on signin response', response)
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

//access user info from localstorage, we save in localstorage
export const isAuth = () =>{
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
}

export const signout = next =>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const updateUser = (response, next) =>{
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}