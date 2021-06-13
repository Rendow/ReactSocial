import {ReduxStateType} from "./redux-store";
import {createSelector} from "reselect";


export const getUsersPageSelector = (state: ReduxStateType) => {
    return state.usersPage.users
}
export const getUsersPage = createSelector([getUsersPageSelector],(users) => {
    return users
})

export const getPageSize = (state: ReduxStateType) => {
    return state.usersPage.usersOnPage
}

export const getTotalUsersCount = (state: ReduxStateType) => {
     return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: ReduxStateType) => {
    return  state.usersPage.currentPage
}
export const getIsFetching = (state: ReduxStateType) => {
    return  state.usersPage.isFetching
}
export const portionSize = (state: ReduxStateType) => {
    return  state.usersPage.portionSize
}
export const getFollowingInProgress = (state: ReduxStateType) => {
    return state.usersPage.followingInProgress
}

