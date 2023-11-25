// 注册
export interface UserRegistration {
    password:string,
    username:string,
    avatarBase64:string
}

// 登录
export interface UserLogin {
    password:string,
    username:string,
}

// 商家信息
export interface MerchantInfoModel {
    botName   :  string ,
    chatStyle   :  string ,
    email   :  string ,
    id   : number,
    coverUrl : string,
    coverBase64   :  string ,
    initialMsg   :  string ,
    introduction   :  string ,
    logisticalArea   :  string ,
    logisticsSpecifiable   : true,
    mainCategory   :  string ,
    merchantName   :  string ,
    nickname   :  string ,
    password  :  string ,
    returnAndExchangeRules   :  string ,
    username  :  string 
}


// 获取来的商家信息，与put的商家信息不一致，区别在coverUrl 和 coverBase64
export const defaultMerchantInfo: MerchantInfoModel = {
    botName: 'Default Bot',
    chatStyle: 'Default Style',
    coverBase64: 'Default Base64',
    coverUrl: 'Default Url',
    email: 'default@example.com',
    id:100, // 默认商家id
    initialMsg: 'Default Initial Message',
    introduction: 'Default Introduction',
    logisticalArea: 'Default Area',
    logisticsSpecifiable: true,
    mainCategory: 'Default Category',
    merchantName: 'Default Merchant',
    nickname: 'Default Nickname',
    password: 'Default Password',
    returnAndExchangeRules: 'Default Rules',
    username: 'Default Username'
}

