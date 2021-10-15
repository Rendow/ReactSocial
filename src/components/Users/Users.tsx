import React, {useEffect} from 'react';
import s from "./Users.module.css";
import {FilterType, getUsers, UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearch} from "./UsersSearch";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPageSize, getUsersFilter} from "../../redux/users-selectors";
import * as queryString from "querystring";


type UsersPropsType = {
    onPageChanged: (pageNumber: number) => void
    users: UsersType[]
    usersOnPage: number
    totalUsersCount:number
    currentPage: number
    portionSize:number
    onFilterChanged:(filter:FilterType) => void
    filter:FilterType
}

export const Users : React.FC<UsersPropsType> = (
    {onFilterChanged,users,currentPage,usersOnPage,
        onPageChanged,totalUsersCount,filter,portionSize,...props}) => {

    const history = useHistory()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     history.push({
    //         pathname:'/users',
    //         search:`?term=${filter.term}&friends=${filter.friend}&page=${currentPage}`
    //     })
    // },[filter,currentPage])

    useEffect(() => {
        // получаем инфо из строки поиска, обрезая первый символ - ?term=d&friends=null&page=4
        const str = history.location.search.substr(1)
        // получаем распарсенный обьект {term: 'd', friends: 'null', page: '4'}
        const parsed = queryString.parse(str) as { term: string, friends: string, page: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)
        switch (parsed.friends) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsers(actualPage,usersOnPage,actualFilter))

    },[])


    useEffect(() => {
        document.title = 'Users'
    },[])

    return (
        <div className={s.wrap}>
            <UsersSearch onFilterChanged={onFilterChanged}/>
            { users.map(u =>
                <User
                users={u}
                key={u.id}
                />)
            }

                <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                usersOnPage={usersOnPage}
                portionSize={portionSize}
            />
        </div>

)}




