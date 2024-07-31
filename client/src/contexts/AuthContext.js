import {createContext, useContext, useState} from "react";
import axios from "axios";

const serverRoot = 'http://localhost:5050';
const AuthContext = createContext(null);

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        _id:"",
        email:"",
        password:"",
        settings:{},
        presets: []
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [settings, setSettings] = useState({
        darkMode: true,
        favoriteMode: false,
    });
    const [presets, setPresets] = useState([]);

    function login(email, password){
        axios.post(serverRoot + '/users/login/', {
            email: email,
            password: password,
        }).then(response => {
            if (typeof response.data !== 'string') {
                setUser(response.data)
                setSettings(response.data.settings)
                setPresets(response.data.presets)
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

    function register(email, password){
        axios.post(serverRoot + '/users/register/', {
            email: email,
            password: password,
        }).then(response => {
            setUser(response.data)
            setLoggedIn(true)
            setSettings(response.data.settings)
            setPresets(response.data.presets)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    function updateAccount(){
        axios.patch(serverRoot + '/users/' + user._id, {
            email: user.email,
            password: user.password,
            settings: user.settings,
            presets: user.presets,
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    function resetPassword(password){
        axios.patch(serverRoot + '/users/' + user._id, {
            password: password,
        }).then(response => {
            console.log(response)
            //TODO: password is not the hashed version, insecure
            setUser({...user, password: password})
        }).catch(error => {
            console.log(error)
        })
    }

    function updateEmail(email){
        axios.patch(serverRoot + '/users/' + user._id, {
            email: email,
        }).then(response => {
            console.log(response)
            setUser({...user, email: email})
        }).catch(error => {
            console.log(error)
        })
    }

    function addPreset(preset){
        setPresets([...presets, preset])
        setUser({...user, presets: [...user.presets, preset]})
        axios.patch(serverRoot + '/users/' + user._id, {
            presets: presets,
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    function updateSettings(newSettings){
        axios.patch(serverRoot + '/users/' + user._id, {
            settings: newSettings,
        }).then(response => {
            console.log(response)
            setUser({...user, settings: newSettings})
            setSettings(newSettings)
        }).catch(error => {
            console.log(error)
        })
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
            user,
            settings,
            loggedIn,
            presets,
            login,
            logout,
            register,
            deleteAccount,
            resetPassword,
            addPreset,
            updateEmail,
            updateSettings
        }
        }>{children}</AuthContext.Provider>
    )
}