import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import  notFound  from "./Error/404"
import Login from './Login'
import Home from './Home'
import RegistrarCliente from './RegistrarCliente'
function Index() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/home' component={Home} exact />  
                    <Route path='/registrar-cliente' component={RegistrarCliente} exact />
                    <Route component={notFound} />
                </Switch>
            </BrowserRouter>
        )
    
}

export default Index
