import {Priority} from "../models/Todos";
import {OptionItem} from "../components/MySelectBox";
import {useNavigate} from "react-router-dom";
import {APIResponse} from "../models/APIResponse";
import axios from "axios";

export const PRIORITY_LABELS: Record<Priority, string> = {
    high: "🔴",
    medium: "🟡",
    low: "🔵",
};

export const PRIORITY_OPTIONS: OptionItem[] = [{value: "high", label:"🔴"}, {value: "medium", label:"🟡"}, {value: "low", label:"🔵"}];

export let BASE_URL = 'http://localhost:8080';

const relogin = async () : Promise<boolean> => {
    try {
        const oldRefreshToken = localStorage.getItem('refreshToken');

        const response =
            await axios.post(BASE_URL + '/api/v1/auth/re-login', { refreshToken: oldRefreshToken });
        const { accessToken, refreshToken } = response.data.response.token;
        if (response.data.success) {
            localStorage.setItem('accessToken', accessToken); // 로컬 스토리지에 저장
            localStorage.setItem('refreshToken', refreshToken);
        }

        return true;
    } catch (e) {

        return false;
    }
}

export const useAuthDelete = (url: string) => {
    const navigate = useNavigate();

    const fetchData = async () : Promise<any> => {
        try {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

            const response = await axios.delete(`${BASE_URL}${url}`, {
                headers: {
                    Authorization: `${token}` // Authorization 헤더에 토큰 추가
                }
            });

            const resp : APIResponse<any> = response.data;
            return resp;
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    const reloginSuccess : boolean = await relogin();
                    if (reloginSuccess) {
                        return await fetchData();
                    } else {
                        navigate('/login');
                    }
                } else if (error.response?.status === 400) {
                    return error.response.data;
                }

            } else {
                console.error('Unknown Error:', error);
            }
        }
    };

    return fetchData;
};

export const useAuthGet = (url: string) => {
    const navigate = useNavigate();

    const fetchData = async () : Promise<any> => {
        try {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

            const response = await axios.get(`${BASE_URL}${url}`, {
                headers: {
                    Authorization: `${token}` // Authorization 헤더에 토큰 추가
                }
            });

            const resp : APIResponse<any> = response.data;
            return resp;
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    const reloginSuccess : boolean = await relogin();
                    if (reloginSuccess) {
                        return await fetchData();
                    } else {
                        navigate('/login');
                    }
                } else if (error.response?.status === 400) {
                    return error.response.data;
                }

            } else {
                console.error('Unknown Error:', error);
            }
        }
    };

    return fetchData;
};

export const useAuthPut = (url: string, data: any) => {
    const navigate = useNavigate();

    let count = 0;

    const fetchData = async () : Promise<any> => {
        try {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

            const response = await axios.put(`${BASE_URL}${url}`,
                data,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    const reloginSuccess : boolean = await relogin();
                    if (reloginSuccess) {
                        return await fetchData();
                    } else {
                        navigate('/login');
                    }
                } else {
                    return error.response?.data;
                }

            } else {
                console.error('Unknown Error:', error);
            }
        }
    };

    return fetchData;
};

export const useAuthPost = (url: string, data: any) => {
    const navigate = useNavigate();

    const fetchData = async () : Promise<any> => {
        try {
            const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

            const response = await axios.post(`${BASE_URL}${url}`,
                data,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    const reloginSuccess : boolean = await relogin();
                    if (reloginSuccess) {
                        return await fetchData();
                    } else {
                        navigate('/login');
                    }
                } else {
                    return error.response?.data;
                }

            } else {
                console.error('Unknown Error:', error);
            }
        }
    };

    return fetchData;
};
