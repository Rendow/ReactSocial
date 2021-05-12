import axios from "axios";


const instance = axios.create({
    withCredentials:true,
    baseURL:  'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
    }})

type CommonType<T = {}> = {
    resultCode: 0 | 1
    messages: Array<string>
    data: T
}

export const userAPI = {

    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get( `users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)},

    followUser(id:number)  {
        return instance.post(`follow/${id}`)
            .then(response =>  response.data)},

    unFollowUser(id:number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)},

    //without instance
    authUser() {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials:true})
            .then(response => {
              return response.data})
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`, {})
            .then(response =>  response.data)},

    login(email:string, password:string,rememberMe:boolean = false) {
        return instance.post<CommonType<{userId: number}>>(`auth/login`, {email,password,rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
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