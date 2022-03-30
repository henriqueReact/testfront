import React, { useEffect, useState, useContext } from "react";
import api from "../api";



import { AuthContext } from "../context/auth";

import { useNavigate } from "react-router-dom";

function Lista() {




    const [allDados, setAllDados] = useState([])
    const [inputLista, setInputLista] = useState('')
    const [estado, setEstado] = useState(true)

    const navigate = useNavigate()


    const [userId, setUserId] = useState('123456789123456789123456')
    const [listaId, setListaId] = useState('')

    useEffect(() => {

        const recoverId = localStorage.getItem('id')
        const recoverListaId= localStorage.getItem('lista')

        setUserId(JSON.parse(recoverId))
        setListaId(JSON.parse(recoverListaId))

       setEstado(false)

      

    }, [])

    useEffect(() => {

        (async () => {
            const response = await api.get(`/lista/${userId}`)
            setAllDados(response.data)

            setEstado(false)

           

        })()
    },[estado])



    /*if (estado) {
        return (<div>Carregando......</div>)
    }*/

    async function getDados() {


        const response = await api.get(`/lista/${userId}`)

        setAllDados([])

        setAllDados(response.data)

        setEstado(false)

      




    }

    ///////////////////////

    async function getDadosListaGrupo() {
        const response = await api.get(`/lista/gru/${userId}`)

        if (response) {
            setAllDados(response.data)
        }

        setInputLista('')


    }

    //////////////////////////////////////


    async function handleSubmitLi(e) {
        e.preventDefault();

        const response = await api.post(`/lista/store/`, {
            nome: inputLista,
            valorTotal: 0,
            usuario: userId
        })

        if (response) {

            setAllDados([...allDados, response.data])

            getDados()

        }





       
        setInputLista('')
        getDados()
    }


    /////////////////////////////////////


    async function removeLista(id) {
        const response = await api.delete(`lista/delete/${id}`)

        if (response) {
            setInputLista('')
            getDados()
        }
    }

    /////////////////////////////////////

    function abreConteudo(id,nome) {

        localStorage.setItem('lista', JSON.stringify(id))
        localStorage.setItem('listanome', JSON.stringify(nome))

        navigate('/itens')

    }



    /////////////////////////////////////


    async function removerAmigos(id){
       


        const response = await api.put(`/lista/amigosremove/${id}`,{
            amigos: userId
        })

        

        setAllDados([])
        getDadosListaGrupo()
     

    }


    /////////////////////////////////////

    const {logout} = useContext(AuthContext)


    const handleLogout = () =>{

        logout()

    }

    ///////////////////////////////

    if(estado){

        return(<div>Carregando..........</div>)
    }


    





    return (



        <div>




            <div>

            <header className="bg-danger text-white">
                <p className="text-right text-white pt-2 mr-4" onClick={() => handleLogout()} >Sair</p>
                {/*<p className="text-right text-white p-4">Bem Vindo: {userId} </p>*/}
                <h3 className="text-center p-3" style={{ fontFamily: 'arial-black' }}> Listas </h3>

                <div>
                    <form  onSubmit={handleSubmitLi}>

                        <div className="d-flex">
                            <input
                                name="nome"
                                value={inputLista}
                                className="w-100 bg-danger text-white  mb-2 col-8 mr-1"
                                style={{ borderBottom: "1px solid #fff", borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}
                                onChange={(ev) => setInputLista(ev.target.value)}
                            />

                            <button className="btn  w-100 bg-danger text-white mb-2 mr-1 " style={{ border: '1px solid #fff' }}>Nova Lista + </button>

                        </div>

                    </form>
                </div>

                <div className="col-12 d-flex pt-2 pb-2 mt-3">

                   <div className="col-6 w-100 bg-danger">
                    <button className="btn  w-100 bg-danger text-white mb-2 mr-1 " style={{ border: '1px solid #fff' }} onClick={() => getDados()} >Minhas Listas</button>
                    </div>
                    <div className="col-6 w-100 bg-danger">
                    <button className="btn  w-100 bg-danger text-white mb-2 mr-1 " style={{ border: '1px solid #fff' }} onClick={() => getDadosListaGrupo()} >Listas Grupos</button>
                    </div>

                </div>


            </header>

            </div>

            <div className="card p-1 pt-2 bg-light border-0">
                <div>
                    <ul style={{ listStyle: "" }}>
                        <div style={{ height: "450px", overflow: 'scroll' }}>

                            {
                                allDados.map((dados, idx) =>

                                {if(dados.usuario === userId){
                                    return(
                                        <li className="mr-4" key={idx}>

                                        <div className="d-flex">




                                            <button className="w-100 btn btn-danger p-3 mb-2 col-10" style={{ borderRadius: '30px' }} onClick={() => abreConteudo(dados._id,dados.nome)} >{dados.nome} </button>


                                             

                                            <button className="col-2 btn btn-light text-secondary ml-1" style={{ borderRadius: '100%' }} onClick={() => removeLista(dados._id)}><i className="fas fa-trash" style={{ fontSize: '18px' }}></i></button>


                                        </div>
                                    </li>
                                    )
                                }else{
                                    return(
                                        <li className="mr-4" key={idx}>

                                        <div className="d-flex">




                                            <button className="w-100 btn btn-danger p-3 mb-2 col-10" style={{ borderRadius: '30px' }} onClick={() => abreConteudo(dados._id,dados.nome)} >{dados.nome} </button>


                                             

                                            <button className="col-2 btn btn-light text-secondary ml-1" style={{ borderRadius: '100%' }} onClick={() => removerAmigos(dados._id)}><i className="fas fa-sign-out-alt" style={{ fontSize: '18px' }}></i></button>


                                        </div>
                                    </li>
                                    )
                                }}


                            /*

                                (



                                    <li className="mr-4" key={idx}>

                                        <div className="d-flex">




                                            <button className="w-100 btn btn-danger p-3 mb-2 col-10" style={{ borderRadius: '30px' }} onClick={() => abreConteudo(dados._id)} >{dados.nome} </button>


                                             

                                            <button className="col-2 btn btn-light text-secondary ml-1" style={{ borderRadius: '100%' }} onClick={() => removeLista(dados._id)}><i className="fas fa-trash" style={{ fontSize: '18px' }}></i></button>


                                        </div>
                                    </li>

                                )*/



                                )
                            }


                        </div>

                    </ul>
                </div>
            </div>


  
        </div>
    )
}

export default Lista;