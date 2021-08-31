import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux'

export const ProtectedRoute = ({ component:Component, ...rest}) =>{
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated)
    return (
        <Route
            {...rest}
            render={ props => {
                if(authenticated==true){
                    return <Component {...props} />
                } else{
                    return <Redirect to="/"></Redirect>
                }
            }}
        ></Route>
    )
}

export const ProtectedRouteAdmin = ({ component:Component, ...rest}) =>{
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated)
    const ruoloUtente = useSelector((state)=>state.utenti.utente.ruolo);
    return (
        <Route
            {...rest}
            render={ props => {
                if(authenticated==true && ruoloUtente=="Admin"){
                    return <Component {...props} />
                } else{
                    return <Redirect to="/"></Redirect>
                }
            }}
        ></Route>
    )
}

export const ProtectedRouteCliente = ({ component:Component, ...rest}) =>{
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated)
    const ruoloUtente = useSelector((state)=>state.utenti.utente.ruolo);
    return (
        <Route
            {...rest}
            render={ props => {
                if(authenticated==true && ruoloUtente=="Cliente"){
                    return <Component {...props} />
                } else{
                    return <Redirect to="/"></Redirect>
                }
            }}
        ></Route>
    )
}

export const ProtectedRouteAutista = ({ component:Component, ...rest}) =>{
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated)
    const ruoloUtente = useSelector((state)=>state.utenti.utente.ruolo);
    return (
        <Route
            {...rest}
            render={ props => {
                if(authenticated==true && ruoloUtente=="Autista"){
                    return <Component {...props} />
                } else{
                    return <Redirect to="/"></Redirect>
                }
            }}
        ></Route>
    )
}

export const ProtectedRouteAddetto = ({ component:Component, ...rest}) =>{
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated)
    const ruoloUtente = useSelector((state)=>state.utenti.utente.ruolo);
    return (
        <Route
            {...rest}
            render={ props => {
                if(authenticated==true && ruoloUtente=="Addetto"){
                    return <Component {...props} />
                } else{
                    return <Redirect to="/"></Redirect>
                }
            }}
        ></Route>
    )
}