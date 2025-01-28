import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_API_URL } from '@env';
const APIURL = BACKEND_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const loadAuthData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');
            if (storedToken) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        };
        loadAuthData();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${APIURL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                setToken(data.token);
                setUser(data.user);
            
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const signup = async (email, password, name) => {
        try {
            const response = await fetch(`${APIURL}/api/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();

            if (response.ok) {
                

            } else {
                throw new Error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setToken(null);
        setUser(null);
        
    
    };

    return (
        <AuthContext.Provider value={{ token, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
