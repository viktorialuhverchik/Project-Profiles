import axios from "axios";

export default {
    login (email, password) { 
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: 'http://localhost:8000/api/auth/login',
            data: {
              email,
              password
            }
        })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            
            return response.data;
        });
    }, 
    signup (email, name, password) {
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: 'http://localhost:8000/api/auth/register',
            data: {
              email,
              name,
              password
            }
        })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          return response.data;
        });
    }    
}