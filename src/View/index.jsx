import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import  notFound  from "./Error/404"
import Login from './Login'
import Home from './Home'
import Admin from "./Admin";
import Users from "./Users";
import Post from "./Post";
import RegistrarCliente from './RegistrarCliente'
import CreatePost from "./CreatePost";
import Categorias from "../Component/Categortias";
function Index() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Login} exact />
                    <Route path='/home' component={Home} exact />
                    {/* <Route path='/login' component={Login} exact />   */}
                    <Route path='/users' component={Users} exact />
                    <Route path='/admin' component={Admin} exact />  
                    <Route path='/registrar-cliente' component={RegistrarCliente} exact />
                    <Route path='/create-post' component={CreatePost} exact />
                    <Route path='/post/:slug' component={Post} exact />
                    <Route path='/categorias' component={Categorias} exact />
                    <Route component={notFound} />
                </Switch>
            </BrowserRouter>
        )
    
}

export default Index
