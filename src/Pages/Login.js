import React,{useState, useContext} from "react";
import { AuthContext } from "../context/auth";



function Login(){

    const {authenticated, login} = useContext(AuthContext)

    ///////////////////  Variaveis State  ////////////////


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /////////////////// fim  Variaveis State  ////////////////

    ////////////// handle login/////////////

    
    async function handleSubmit(e){



        e.preventDefault()


        login(email, password)

    }



    ////////////// fim handle login/////////////



    return(
        <div className="bg-danger pt-5" style={{ height: "100vh" }}>

        <div className="pt-4" >

           {/* <p className="text-center text-white">{String(authenticated)}</p>*/}

        <h1 className="text-white text-center" style={{fontFamily:"arial-black"}}>Boas Compras !!!</h1>
        
        <h2 className="text-white text-center mt-3" style={{fontFamily:"arial-black"}}> <i className="fas fa-shopping-cart" style={{fontSize:'60px'}}></i></h2>
           

            <div className="card bg-danger border-0 col-11 container mt-3" style={{}}>

                <div className="card-body bg-danger">

                    <form onSubmit={handleSubmit}>

                        <label className="text-white">Email</label>

                        <input className="form-control bg-danger text-white" style={{ borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '1px solid #fff' }}

                            defaultValue={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            type="email"

                        />


                        <label className="text-white mt-4">Senha</label>

                        <input className="form-control bg-danger text-white" style={{ borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '1px solid #fff' }}

                            defaultValue={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            type="password"

                        />

                        <button className="btn btn-light btn-block text-danger mt-5">Logar</button>

                    </form>

                </div>

            </div>


        </div>


    </div>
    )
}

export default Login;