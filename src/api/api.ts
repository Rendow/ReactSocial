import axios from "axios";

const baseUrl =  'https://social-network.samuraijs.com/api/1.0'

const instance = axios.create({
    withCredentials:true,
    baseURL:  'https://social-network.samuraijs.com/api/1.0',
    headers:{
        'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
    }})

export const userAPI = {
    //with instance
    getUsers (currentPage = 1, pageSize = 5) {
        return    instance.get( `/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    delUsers  (id = 1)  {
        return   instance.delete(`/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    //without instance
    postUsers  (id = 1) {
        return   axios.post(baseUrl + `/follow/${id}`, {},{
            withCredentials:true,
            headers:{
                'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
            }
        })
            .then(response => {
                return response.data
            })
    }

}

//with instance
export const getUsers = (currentPage = 1, pageSize = 5) =>{
    return    instance.get( `/users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}
export const delUsers = (id = 1) => {
  return   instance.delete(`/follow/${id}`)
      .then(response => {
            return response.data
        })
}

//without instance
export const postUsers = (id = 1) =>{
    return   axios.post(baseUrl + `/follow/${id}`, {},{
        withCredentials:true,
        headers:{
            'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
        }
    })
        .then(response => {
            return response.data
        })
}