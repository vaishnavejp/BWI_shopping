import React, { useEffect, useState,useContext } from "react";
import useSWR from 'swr';
import { useLocation } from 'react-router-dom';

export default function Auth({propss}) {

    const { state } = useLocation();
    const props = state || "invalid";

    console.log(props)

    useEffect(() => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              
              username: props.uname,
              password: props.password,
              // expiresInMins: 60, // optional
            })
          })
          .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Response Status Code:', res.status);
            // setLoggedIn(true);
            return res.json();
          })
          .then(data => {
            props.setToken(data.token)
          })
          .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        // console.log(token);
        localStorage.setItem('token', JSON.stringify(props.token));

        var tok = JSON.parse(localStorage.getItem("token"));
        var bearer = "Bearer " + tok;
        fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': bearer, 
            }, 
        })
        .then(res => res.json())
        .then(console.log);
        // console.log(bearer)
    }, [props.token]);

    // if(loggedin == true) {
        return (
            <div>
                Login Successful!
            </div>
        )
    // }

    // else {
    //     return (
    //         <div>
    //             Failed!
    //         </div>
    //     )
    // }
}