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
    followUser(id = 1)  {
        return   instance.delete(`/follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    //without instance
    unFollowUser(id = 1) {
        return   axios.post(baseUrl + `/follow/${id}`, {},{
            withCredentials:true,
            headers:{
                'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
            }})
            .then(response => {
                return response.data
            })
    },
    authUser() {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials:true
        })
            .then(response => {
              return response.data
            })},
    getProfile(userId:number) {
        return profileAPI.getProfile(userId)
    },
}

export const authAPI = {
    me() {
        return instance.get(`/auth/me`, {})
            .then(response => {
                return response.data
            })},
    login(email:string, password:string,rememberMe:boolean = false) {
        return instance.post(`/auth/login`, {email,password,rememberMe})
    },
    logout() {
        return instance.delete(`/auth/login`)
    },
}

export const profileAPI = {

    getProfile(userId:number) {
        return instance.get(`profile/`+ userId)
            .then(response => {
                return response
            })},
    getStatus(userId:number) {
        return instance.get(`profile/status/`+ userId)
          },
    updateStatus(status:string) {
        return instance.put(`profile/status/`, {status})
           },

}