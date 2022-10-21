import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as action from '../Redux/Actions/Todo'
import './Todo.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios'



const Home = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const token = useSelector((state) => state.auth.token)
    const todos = useSelector((state) => state.todo.todos);
    const user = useSelector((state) => state.auth.userId)

    console.log("todos", todos)

    const [todo, setTodo] = useState("")
    const [updateId, setUpdateId] = useState()
    const [updateButton, setUpdateButton] = useState(false)
    const [msg, setMsg] = useState(false)
    // const [fid, setFid] = useState(JSON.parse(localStorage.getItem("id")))
    const [updatekey, setUpdateKey] = useState(null)
    const [data, setData] = useState(JSON.parse(localStorage.getItem("todo")))

    console.log("main- data", data)



    axios.get('https://todo-list-1ac93-default-rtdb.firebaseio.com//item.json')
        .then(res => {
            let arr = []
            let keys = []

            let len = Object.keys(res.data).length

            for (var i = 0; i < len; i++) {
                keys.push(Object.keys(res.data)[i])
            }

            for (var i = 0; i < len; i++) {
                arr.push({ ...Object.values(res.data)[i], key: keys[i] })
            }
            console.log("arr", arr);

            localStorage.setItem('todo', JSON.stringify(arr))
        })




    function editTodo(id, item, key) {
        setUpdateId(id)
        setTodo(item)
        setUpdateKey(key)
        setUpdateButton(true)
    }



    const id = Date.now().toString();
    const items = {
        user: user,
        id: id,
        item: todo,
    };

    useEffect(() => {
        if (data !== null) {

            data.forEach(element => {

                if (user === element.user) {
                    dispatch(action.addTodo(element));
                    console.log("element", element);
                }
            });
        }
    }, [user])

    function addHandler() {
        if (!token) {
            navigate('/Auth');
        }
        else {
            if (todo === null || todo === undefined || todo === "") {
                setMsg(true)
            } else {

                console.log("items", items)

                dispatch(action.add(items, token));
                setTodo("");
                setMsg(false)
            }
        }
    }
    var temp = []


    function updateHandler() {
        const updateTodo = {
            id: updateId,
            item: todo,
            user: user,
            key: updatekey

        }
        setUpdateButton(false)
        dispatch(action.updateTodo(updateTodo))
        const body = { "item": updateTodo.item }

        axios.patch(`https://todo-list-1ac93-default-rtdb.firebaseio.com/item/${updatekey}.json`, body)
            .then((res) => {
                console.log("update-res", res.data)

                // let upTodo = []
                // upTodo.push(updateTodo)
                temp.push(updateTodo)
                localStorage.setItem('todo', JSON.stringify(updateTodo))

                // localStorage.setItem('todo', JSON.stringify(upTodo))


                setUpdateKey(null)
            })
        setTodo("")
    }


    function deleteTodo(id, key) {
        // console.log("yes", data)
        dispatch(action.deleteTodo(id))

        const aa = JSON.parse(localStorage.getItem('todo'))
        // console.log("wwwwwwwwwwwwwwwwwwwwwwwwww",aa)
        if (aa !== null) {
            aa.forEach(element => {
                if (element.key === key) {
                    console.log("++++++++element", key)
                    axios.delete(`https://todo-list-1ac93-default-rtdb.firebaseio.com/item/${key}.json`)
                        .then(res => {

                            setData(data.filter(element => {
                                return element.key !== key
                            }))
                            console.log("dataaaaaaaaaaaaaaataaaaaaaaaatttttttt", data)
                            temp.push(data)
                            localStorage.setItem('todo', JSON.stringify(data))

                        });
                }
            })
        }



    }
    console.log("temp", temp)






    return (
        <>
            <div className='top'>
                <Form.Group className=" todo mb-3 col-md-8">
                    <Form.Control type="text" placeholder="ADD TO DO" value={todo} onChange={(e) => setTodo(e.target.value)} />
                </Form.Group>
                {updateButton ?
                    <Button variant="success" onClick={updateHandler}>+ UPDATE</Button>
                    :
                    <Button variant="success" onClick={addHandler}>ADD</Button>
                }
            </div>
            <div>
                <ul>
                    {msg ? <p style={{ color: "red" }}>Enter something</p>
                        :
                        todos.map((i) => {
                            console.log("i", i)
                            return (
                                <div className='container' key={i.id}>
                                    <Card className='my-3 col-md-6 ' >
                                        <Card.Body>
                                            <Card.Text>
                                                {i.item}
                                            </Card.Text>
                                            <Button className='mx-3' variant="danger" onClick={() => deleteTodo(i.id, i.key)}>DELETE</Button>
                                            <Button variant="primary" onClick={() => editTodo(i.id, i.item, i.key)}>EDIT</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Home