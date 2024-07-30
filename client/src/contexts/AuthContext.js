import {createContext, useContext, useState} from "react";
import axios from "axios";

const serverRoot = 'http://localhost:5050';
const AuthContext = createContext(null);

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [settings, setSettings] = useState({
        darkMode: true,
        favoriteMode: false,
    });
    const [presets, setPresets] = useState([]);

    function login(username, password){
        axios.post(serverRoot + '/users/login', {
            username: username,
            password: password,
        }).then(response => {
            if (typeof response.data !== 'string') {
                setUser(response.data)
                setLoggedIn(true)
                return true
            } else return false
        }).catch(error => {
            console.log(error);
            return false
        })
    }

    function logout() {
        setUser(null);
        setLoggedIn(false);
        setSettings(null);
        setPresets([]);
    }

    function register(username, password){
        axios.post(serverRoot + '/users', {
            username: username,
            password: password,
        }).then(response => {
            setUser(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    function updateAccount(username, password){

    }

    function deleteAccount(){
        axios.delete(serverRoot + '/users/' + user._id)
        .then(response => {
            console.log(response)
            logout()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <AuthContext.Provider value={{
            settings,
            loggedIn,
            presets,
            login,
            logout,
            register,
            deleteAccount
        }
        }>{children}</AuthContext.Provider>
    )
}