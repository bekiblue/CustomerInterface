import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();                                        
                                                                       
                                                                                                                                                                                            
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://customersupport-4.onrender.com:5000/api/login', { email, password });
            const data = response.data;

            if (response.status === 200) {
                const decodedToken = jwtDecode(data.token);
                setUser(decodedToken);
                localStorage.setItem('token', data.token);
                navigate('/customer-data');
                return true;
            } else {
                console.error('Login failed:', data.message)
                return false;
            }

        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthContext, AuthProvider };