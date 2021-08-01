import axios from "axios";
import {UsersType} from "../redux/users-reducer";
import {ProfileType} from "../redux/propfile-reducer";
import {FormType} from "../components/Profile/ProfileInfo/ContentForm/ContentForm";


export enum ResultCode  {
    Success = 0,
    Error = 1,
    Captcha = 10,
}

export type CommonType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCode
}

type UsersCommonType = {
    items: UsersType[]
    totalCount: number
    error: null | string
}
type MeResponseType = {
    id: number
    email: string
    login: string
}

const instance = axios.create({
    withCredentials:true,
    baseURL:  'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        'API-KEY':'7e928b19-02e3-4839-a906-80cc9541b152'
    }})

export const userAPI = {

    getUsers (currentPage = 1, pageSize = 5, term:string = '', friend:null | boolean = null) {
        const isFriend = friend === null ? '' : `&friend=${friend}`

        return instance.get<UsersCommonType>( `users?page=${currentPage}&count=${pageSize}&term=${term}`+ isFriend)
            .then(response => response.data)},

    followUser(id:number)  {
        return instance.post<CommonType>(`follow/${id}`)
            .then(response =>  response.data)},

    unFollowUser(id:number) {
        return instance.delete<CommonType>(`follow/${id}`)
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
        return instance.get<CommonType<MeResponseType>>(`auth/me`, {})
            .then(response =>  response.data)},

    login(email:string, password:string,rememberMe:boolean = false,captchaURL:string | null = null) {
        return instance.post<CommonType<{userId: number}>>(`auth/login`, {email,password,rememberMe,captchaURL})
    },
    logout() {
        return instance.delete<CommonType>(`auth/login`)
    },
}

export const profileAPI = {

    getProfile(userId:number | null) {
        return instance.get(`profile/`+ userId)
            .then(response => {
                return response
            })},
    getStatus(userId:number) {
        return instance.get(`profile/status/`+ userId)
          },
    setPhoto(file:string | Blob) {
        const formData = new FormData()
        formData.append('image',file)

        return instance.put(`/profile/photo/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
          },
    setProfile(profile:FormType) {
        return instance.put(`profile`,profile)
    },

    updateStatus(status:string) {
        return instance.put<CommonType>(`profile/status/`, {status})
           },

}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<CommonType<{url: string}>>(` /security/get-captcha-url/`)
    },
}