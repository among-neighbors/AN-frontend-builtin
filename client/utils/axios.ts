import axios, { AxiosInstance } from 'axios';
export const getKakaoAPI: AxiosInstance = axios.create({
    headers: {
        contentType: 'multipart/form-data',
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`
    }
});
