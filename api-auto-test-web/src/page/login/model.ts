interface ImageResponse {
    captchaEnabled: boolean;
    code: number;
    img: string;
    msg: string;
    uuid: string;
}

interface LoginResponse {
    code: number;
    msg: string;
    token: string;
}