import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export default function PrivateRoute({children}){
    let auth = sessionStorage.getItem('admin');
    console.log(auth)
    return(
        <Route
            render={({location})=>auth == "true" ? children: <Redirect to={{pathname:"/",state:{from:location}}}/>}
        />
    )
}