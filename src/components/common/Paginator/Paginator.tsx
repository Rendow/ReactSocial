import React, {useState} from 'react';
import s from "./Paginator.module.css";


type PaginatorPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize:number
    currentPage: number
    portionNumber:number
}

export const Paginator = (props:PaginatorPropsType) => {
    let selectedPage = s.selectedPage + ' ' + s.pagination
    const [portionNumber,setPortionNumber] = useState(1)


    const pagesCount = Math.ceil( props.totalItemsCount / props.pageSize)
    const pages:number[] = []

    for (let i = 1;i <= pagesCount ;i++){ pages.push(i) }

    const portionCount = Math.ceil(pagesCount  / props.portionNumber)

    const leftPortionSize = (portionNumber - 1) * props.pageSize + 1
    const rightPortionSize = portionNumber * props.pageSize



    return (
            <div className={s.wrap}>
                {portionNumber > 1 &&
                <button
                    onClick={() => {setPortionNumber(portionNumber - 1)}}>
                    prev </button>}

                {pages.filter(p => p >= leftPortionSize && p <= rightPortionSize)
                    .map(p => {
                    return <span
                            className={props.currentPage === p ? selectedPage : s.pagination}
                            onClick={()=>{props.onPageChanged(p)}}>
                       {p} </span>  })}

                {portionCount > portionNumber &&
                <button
                    onClick={() => {setPortionNumber(portionNumber + 1)}}>
                    next </button>}
            </div>

)}