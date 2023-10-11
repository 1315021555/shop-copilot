import { MsgDirection } from "./enum";

// 单条对话信息
export interface SingleChatMessage {
    direction:MsgDirection, // 方向
    content:string,     //内容
    
}