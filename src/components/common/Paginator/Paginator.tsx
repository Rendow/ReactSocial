import React from 'react';
import s from "./Paginator.module.css";


type PaginatorPropsType = {
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount:number
    currentPage: number
}


export const Paginator = (props:PaginatorPropsType) => {

    let selectedPage = s.selectedPage + ' ' + s.pagination
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages:number[] = []

    for (let i = 1;i <= pagesCount ;i++){
        pages.push(i)
    }

    return (
            <div>
                {pages.map(p => {
                    return  p <15 && <span className={props.currentPage === p ? selectedPage : s.pagination}
                                           onClick={()=>{props.onPageChanged(p)}}>
                       {p} </span>  })}
            </div>


)}