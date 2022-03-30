import React, { useContext, useState } from "react";

import Lista from "./Lista";
import Login from "./Login";
import Itens from "./Itens";




import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import { AuthProvider, AuthContext } from "../context/auth";

const AppRoutes = () => {


    const Private = ({children}) =>{
            
        const { authenticated, loading, usuarioId} = useContext(AuthContext)

        if(loading){
            return (<div>Carregando......</div>)
        }

        if(!authenticated){
            return <Navigate to="/" />
        }

      

        return children
    }





    return (
        <Router>

            <AuthProvider>

                <Routes>


                    <Route exact path="/" element={<Login />} />

                    <Route exact path="/lista" element={<Private><Lista /></Private>} />
                    <Route exact path="/itens" element={<Private><Itens /></Private>} />



                </Routes>

            </AuthProvider>

        </Router>
    )
}

export default AppRoutes;