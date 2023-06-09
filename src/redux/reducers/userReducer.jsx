import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_LOGOUT, USERS_REQUEST, USERS_SUCCESS, USERS_FAIL, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL } from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const allUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return { loading: true }
        case USERS_SUCCESS:
            return { loading: false, usersData: action.payload }
        case USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const customerDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_DETAILS_REQUEST:
            return { loading: true }
        case CUSTOMER_DETAILS_SUCCESS:
            return { loading: false, customerData: action.payload }
        case CUSTOMER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

