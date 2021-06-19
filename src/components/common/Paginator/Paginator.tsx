import React, {useState} from 'react';
import s from "./Paginator.module.css";
import SuperButton from "../FormsControl/SuperButton";


type PaginatorPropsType = {
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize:number
    currentPage: number
    portionSize:number
}

export const Paginator = React.memo((props:PaginatorPropsType) => {

    let selectedPage = s.selectedPage + ' ' + s.pagination
    const [portionNumber,setPortionNumber] = useState(1)

     //всего юзеров / кол-во юзеров на странице = кол-во страниц
    const pagesCount = Math.ceil( props.totalItemsCount / props.pageSize)
    const pages:number[] = []

    for (let i = 1;i <= pagesCount ;i++){ pages.push(i) }

    // кол-во страниц / "порцию страниц"  = кол-во "порций" страниц
    const portionCount = Math.ceil(pagesCount  / props.portionSize)

    const leftPortionSize = (portionNumber - 1) * props.pageSize + 1
    const rightPortionSize = portionNumber * props.pageSize

    return (
            <div className={s.wrap}>
                {portionNumber > 1 &&
                <SuperButton
                    className={s.button}
                    onClick={() => {setPortionNumber(portionNumber - 1)}}>
                    PREV </SuperButton>}

                {pages
                    .filter(p => p >= leftPortionSize && p <= rightPortionSize)
                    .map(p => {
                    return <span
                            className={props.currentPage === p ? selectedPage : s.pagination}
                            onClick={()=>{props.onPageChanged(p)}}>
                       {p < 10 ? `${' '}${p}${' '}`: p} </span>  })}


                {portionCount > portionNumber &&
                <SuperButton
                    className={s.button}
                    style={{marginLeft:'10px'}}
                    onClick={() => {setPortionNumber(portionNumber + 1)}}>
                    NEXT </SuperButton>}
            </div>
)})