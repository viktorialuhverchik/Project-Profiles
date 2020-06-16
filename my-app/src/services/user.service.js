import axios from "axios";

export default {
    async getProfiles() {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://localhost:8000/api/users/all'
        })
        .then(response => response.data);
    },
    deleteProfiles(users) {
        const token = localStorage.getItem('token');

        return axios({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://localhost:8000/api/users/delete',
            data: {
                users
            }
        })
        .then(response => response.data)
    },
    blockAndUnblockProfiles(users, command) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://localhost:8000/api/users/update-status',
            data: {
                users,
                command
            }
        })
        .then(response => response.data)
    },
}