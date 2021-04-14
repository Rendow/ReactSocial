import React from 'react';
import s from "./Users.module.css";
import logo from "./img/logo.png";
import axios from "axios";
import {dispatchToPropsType, mapStateToPropsType} from "./UsersContainer";


type UsersPropsType = mapStateToPropsType & dispatchToPropsType

class Users extends React.Component <UsersPropsType,{}>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }
   onPageChanged = (pageNumber:number) => {
       this.props.setCurrentPage(pageNumber)
       axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
           .then(response =>{
               this.props.setUsers(response.data.items)
           })
   }
    render(){
        let selectedPage = s.selectedPage + ' ' + s.pagination
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages:number[] = []
        //pages.slice(0.15).map(p => p)

         for (let i = 1;i <= pagesCount ;i++){

            pages.push(i)
        }
        // let i = 1
        // while(i < pagesCount ){
        //     pages.push(i)
        //     i++
        // }
        return (
            <div>

                {this.props.users.map(u => <div className={s.wrap} key={u.id}>
                <span>
                    <div>
                    <img src={u.photos.small != null ? u.photos.small : logo} className={s.photo}/>
                </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div> {u.name}</div>
                        <div> {u.status}</div>
                    </span>
                    <span>
                         <div>{'u.location.country'}</div>
                         <div>{'u.location.city'}</div>
                    </span>
                </span>
                </div>)}

                <div>
                    {pages.map(p => {
                        return  p <15 && <span className={this.props.currentPage === p ? selectedPage : s.pagination}
                                     onClick={()=>{this.onPageChanged(p)}}>
                       {p} </span>  })}
                </div>
            </div>
        )
    }
}

export default Users