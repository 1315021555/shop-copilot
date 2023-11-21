// 注册
export interface UserRegistration {
    nickname:string,
    password:string,
    username:string,
    email:string

}

// 登录
export interface UserLogin {
    password:string,
    username:string
}