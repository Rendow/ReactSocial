import React, {useEffect} from 'react';
import s from "./Users.module.css";
import {FilterType, getUsers, UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearch} from "./UsersSearch";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
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

type QueryType = { term?: string, friends?: string, page?: string };

export const Users : React.FC<UsersPropsType> = (
    {onFilterChanged,users,currentPage,usersOnPage,
        onPageChanged,totalUsersCount,filter,portionSize,...props}) => {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Users'
    },[])


    useEffect(() => {
        // получаем инфо из строки поиска, обрезая первый символ - ?term=d&friends=null&page=4
        const str = history.location.search.substr(1)
        // получаем распарсенный обьект {term: 'd', friends: 'null', page: '4'}
        const parsed = queryString.parse(str) as QueryType

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter,term:parsed.term }
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
        const query:QueryType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend != null) query.friends = String(filter.friend)
        if(currentPage != 1) query.page = String(currentPage)

        history.push({
            pathname:'/users',
            search:queryString.stringify(query)
        })
    },[filter,currentPage])

    return (
        <div className={s.wrap}>

            <UsersSearch onFilterChanged={onFilterChanged}/>
            <div className={s.users}>{users.map(u => <User users={u} key={u.id}/>)}</div>

            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                usersOnPage={usersOnPage}
                portionSize={portionSize}
            />
        </div>

)}




