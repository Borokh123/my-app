import axios from "axios";
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '382b48f1-9ad1-4f20-81a5-b96d06f68391'
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
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
    // getProfile(userId) {
    //     return instance.get('profile/' + userId )
    //     // console.warn("obslote method please use ProfileAPI");
    //     // return profileAPI.getProfile(userId);
    // }

}
export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
        // .then(response => {
        //     return response.data //возвращаем только data
        // });

    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    }

}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            // .then(response => {
            //     return response.data
            // });
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe });

    },
    logout() {
        return instance.delete(`auth/login`);

    }

}


// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`follow?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data
//         });
// }

