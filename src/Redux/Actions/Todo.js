import axios from 'axios'
import * as actionType from './ActionType'
// import { db } from './firebase';
import { db } from '../../Firebase';
import { uid } from 'uid';
import { ref, remove } from 'firebase/database'

export const addTodo = (data) => {
    return {
        type: actionType.ADD_TODO,
        payload: data
    }
}

export const failTodo = (data) => {
    return {
        type: actionType.FAIL_TODO,
        payload: data
    }
}

export const deleteTodo = (data) => {
    return {
        type: actionType.DELETE_TODO,
        payload: data
    }
}

export const updateTodo = (data) => {
    return {
        type: actionType.UPDATE_TODO,
        payload: data
    }
}

export const removeTodo = () => {
    return {
        type: actionType.REMOVE_TODO,
        payload: null
    }
}

export const add = (data, token) => {
    console.log("iiiiiiiiiiitem", data)
    localStorage.setItem("todo", JSON.stringify(data))
    return dispatch => {
        axios.post('https://todo-list-1ac93-default-rtdb.firebaseio.com/item.json?auth=' + token, data)
            .then(response => {
                console.log("4444444444444444", response)
                console.log("5555555555555555555555555555555555555", data)

                const items = {
                    id: data.id,
                    user: data.user,
                    item: data.item,
                    key: response.data.name
                }

                dispatch(addTodo(items));
            })
            .catch(error => {
                dispatch(failTodo(error));
            })
    }
};




