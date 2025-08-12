
import axios from "axios";
import { ProfileType } from "../types/types";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c018423f-3c17-4fb9-b3bc-2c484812c346'
    }

});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    //здесь пропсов нет поєтому ф-я получает єти данные из параметров, пускай передаст тот кото вызывает эту ф-ю
    follow(userId: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
    // getProfile(userId) {
    //     return instance.get('profile/' + userId )
    //     // console.warn("obslote method please use ProfileAPI");
    //     // return profileAPI.getProfile(userId);
    // }

}
export const profileAPI = {

    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
        // .then(response => {
        //     return response.data //возвращаем только data
        // });

    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }

}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
   
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}



type meResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type loginResponseType = {
    data: {
        userId: number

    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type logoutResponseType = {
    data: {

    }
    resultCode: ResultCodesEnum 
    messages: Array<string>
}

export const authAPI = {
    me() {                              // метод get post put являеться дженериками
        return instance.get<meResponseType>(`auth/me`).then(res => res.data) // get возвращает промис, а в промисе будет лежать ответ от сервера
        // .then(response => {
        //     return response.data
        // });
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<loginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);

    },
    logout() {
        return instance.delete<logoutResponseType>(`auth/login`).then(res => res.data);;

    }

}
//instance.get<string>(`auth/me`).then((res) => res.data.toUpperCase()); // пример использования дженерика

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)

    }

}



// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`follow?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data
//         });
// }

