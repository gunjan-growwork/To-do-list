import * as actionType from '../Actions/ActionType'
import { updateObject } from './Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
            })
        case actionType.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
            })
            case actionType.AUTH_LOGOUT:
                return updateObject(state, {
                    token: null,
                    userId: null,
                });
        default:
            return state;
    }
}

export default AuthReducer;