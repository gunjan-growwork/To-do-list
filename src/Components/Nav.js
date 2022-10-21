import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as actions from '../Redux/Actions/Auth'
import * as action from '../Redux/Actions/Todo'

const Nav = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const email = JSON.parse(localStorage.getItem("email"));
    const password = JSON.parse(localStorage.getItem("password"));
    const isSignup = JSON.parse(localStorage.getItem("isSignup"));


    const logoutHandler = () => {
        dispatch(actions.logout())
    dispatch(action.removeTodo())
        navigate('./Auth')
    }

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">TO Do App</span>
                <div className="d-flex" role="search">
                    <button className="btn btn-outline-success" type="submit" onClick={()=>logoutHandler()}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Nav;