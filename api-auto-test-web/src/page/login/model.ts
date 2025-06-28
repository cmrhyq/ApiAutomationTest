export interface ImageResponse {
    captchaEnabled: boolean;
    code: number;
    img: string;
    msg: string;
    uuid: string;
}

export interface LoginResponse {
    code: number;
    msg: string;
    token: string;
}

export interface CommonResponse {
    code: number;
    msg: string;
    data?: any; // data字段可能存在也可能不存在
}