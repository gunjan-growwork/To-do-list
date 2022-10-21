import * as actions from '../Actions/ActionType'
import { db } from '../../Firebase';
import { uid } from 'uid';
import { ref, remove } from 'firebase/database'

let initialState = {
    todos: [],
}

const ToDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_TODO:
            return {
                
                ...state,
                todos: [...state.todos, action.payload],
            };
        case actions.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
                

            };
        case actions.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => (todo.id === action.payload.id) ? action.payload : todo),
            };
            case actions.FAIL_TODO:
            return {
                ...state,
               
            };
          case actions.REMOVE_TODO:
            return {
               ...state,
             todos : []
            };  
        default:
            return state;
    }   
}

export default ToDoReducer;