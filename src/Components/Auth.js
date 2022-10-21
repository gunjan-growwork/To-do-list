import React, { useEffect, useState } from 'react'
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as actions from '../Redux/Actions/Auth'
import img from '../Assets/groworkp.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const Auth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.userId)

    // console.log("token",token)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignup, setIsSignup] = useState(true)
    // const [data, setData] = useState()


    useEffect(() => {
        // dispatch(actions.auth(email, password, isSignup))
        localStorage.setItem("email", JSON.stringify(email))
        localStorage.setItem("password", JSON.stringify(password))
        localStorage.setItem("isSignup", isSignup)

    }, [user])


    const submitHandler = () => {
        // e.preventDefault();
        console.log("first")
        dispatch(actions.auth(email, password, isSignup))

        if (token) {
            navigate('/');
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    },)


    const switchAuth = () => {
        const change = isSignup
        setIsSignup(!change)
    }

    return (
        <>
            <div className='main'>
                <div className='div1'>
                    <div className='growwork'>
                        <img src={img} />
                    </div>
                </div>
                <div className='div2'>
                    <div >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} minLength={8} />
                        </Form.Group>
                        <Button variant="success" type="button" onClick={(e) => submitHandler(e)}>
                            Submit
                        </Button>
                        <Button className='mx-3 my-3' variant="danger" type="button" onClick={() => switchAuth()}>
                            SWITCH TO {isSignup ? "SIGNUP" : "SIGNIN"}
                        </Button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default Auth;