import {ReduxStateType} from "../redux-store";


export const getFollowingInProgress = (state: ReduxStateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: ReduxStateType) => {
    return state.usersPage.filter
}

