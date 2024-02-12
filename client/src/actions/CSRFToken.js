import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/accounts/csrf_cookie`,{withCredentials: true});
            } catch (err) {

            }
        };

        fetchData();
        console.log(getCookie('csrftoken'))
        setcsrftoken(getCookie('csrftoken'));
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;