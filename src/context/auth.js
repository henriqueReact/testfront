import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();


    const [user, setUser] = useState(null)
    const [usuarioId, setUsuarioId] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() =>{

        const recoveredUser = localStorage.getItem('user')
        const recoverId = localStorage.getItem('id')

        if(recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        if(recoverId){
            setUsuarioId(JSON.parse(recoverId))
        }

        setLoading(false)

    },[])


    const login = async(email, password) =>{

       
       const response = await api.post('/usuarios/login',{
           email, password
       })


       
        const loggedUser = response.data.user
        const token = response.data.token
        const meuId = response.data.user._id
        

        localStorage.setItem("user", JSON.stringify(loggedUser))
        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem('id', JSON.stringify(meuId))

        api.defaults.headers.Authorization = `Bearer ${token}`


   
            setUser(loggedUser)
            navigate('/lista')
      

       

        
    }

    const logout = () =>{

        console.log('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('lista')
        localStorage.removeItem('listanome')

        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/')

    }

    return (


        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading, usuarioId}}>



        {children}

        </AuthContext.Provider>

    )

}