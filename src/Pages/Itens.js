import React, { useState, useEffect } from "react";
import api from "../api";


function ListaIens() {

    const globalId = localStorage.getItem('id')

    const [produto, setProduto] = useState('')
    const [valor, setValor] = useState(parseFloat(0))
    const [quantidade, setQuantidade] = useState(parseInt(0))
    const [allDados, setAllDados] = useState([])

    const [prodEdit, setProdEdit] = useState('')
    const [valorEdit, setValorEdit] = useState(parseFloat(0))
    const [quantEdit, setQuantEdit] = useState(parseInt(0))

    const [somaTot, setSomaTot] = useState(1)

    const [userId, setUserId] = useState('')
    const [listaId, setListaId] = useState('123456789123456789123456')

    const [amigoId, setAmigoId] = useState('')

    const [nomeLista, setNomeLista] = useState('')

    const [tempo, setTempo] = useState(true)











    function obterDados() {

        const recoverId = localStorage.getItem('id')
        const recoverListaId = localStorage.getItem('lista')
        const recoverNomeLista = localStorage.getItem('listanome')

        setUserId(JSON.parse(recoverId))
        setListaId(JSON.parse(recoverListaId))
        setNomeLista(JSON.parse(recoverNomeLista))

    }




    useEffect(() => {

        obterDados()

        getDados()

        setTempo(false)

        somarTudo()

       

    }, [listaId])









    async function getDados() {



        const response = await api.get(`/listaitens/itens/${listaId}/`)

        if (response) {

            setAllDados([])
            setAllDados(response.data)



        }










    }



    // editar campo  nome

    async function changeInputNome(e, obj, id) {

        if (prodEdit && prodEdit !== obj) {
            await api.put(`/listaitens/edit/${id}`, {
                produto: prodEdit
            })
        }



        setAllDados([])

        getDados()

        somarTudo()
    }

    // editar campo  nome

    async function changeInputPreco(e, obj, id) {

        if (valorEdit && valorEdit !== obj) {
            await api.put(`/listaitens/edit/${id}`, {
                preco: valorEdit
            })
        }

        setAllDados([])

        getDados()

        somarTudo()
    }

    // editar campo  quantidade

    async function changeInputQuantidade(e, obj, id) {

        if (quantEdit && quantEdit !== obj) {
            await api.put(`/listaitens/edit/${id}`, {
                quantidade: quantEdit
            })
        }

        setAllDados([])

        getDados()

        somarTudo()
    }

    // mudar estatus

    async function changStatus(id, obj) {

        await api.put(`/listaitens/edit/${id}`, {
            status: obj
        })

        getDados()
        somarTudo()

    }

    // atualizar pago lista geral

    async function changStatusGeral(obj) {



        await api.put(`/listaitens/atualizastatus`, {

            lista: listaId,
            usuario: userId,
            status: obj
        })

        finalList()


    }

    // remover item 

    async function removerProduto(id, usuario) {

        if (usuario !== userId) {

            alert("Você não pode remover esse produto")

        } else {
            const response = await api.delete(`/listaitens/delete/${id}`)
            setAllDados([])

            getDados()

            somarTudo()

        }

        //alert(usuario + " + " + userId)



        setAllDados([])

        getDados()

        somarTudo()



    }

    // adiciona produto

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/listaitens/store', {

            produto: produto,
            preco: valor,
            quantidade: quantidade,
            usuario: userId,
            lista: listaId,
            status: "Lista"
        })

        setProduto('')
        setValor(parseFloat(0))
        setQuantidade(parseInt(0))

        setAllDados([...allDados, response.data])


        somarTudo()
        getDados()
        somarTudo()


    }

    ////////

    async function somarTudo() {



        const calc = await allDados.reduce((a, b) => a + b.preco * b.quantidade, 0)

        setSomaTot(parseFloat(calc))


        setTempo(false)
    }


    async function handleSubmitAmigos(e) {
        e.preventDefault();


        const response = await api.put(`/lista/amigos/${listaId}`, {
            amigos: amigoId
        })

        if (response) {
            alert("Adicionado com sucesso!!!")
            somarTudo()


        }

        getDados()
        somarTudo()

        setAmigoId('')


    }


    ///

    async function finalList() {



        const response = await api.get(`/listaitens/itensfinal/${listaId}/${userId}`, {

        })

        if (response) {

            setAllDados([])

            setAllDados(response.data)

            somarTudo()



        }






    }



    if (tempo) {

        return (<div>Carregando......</div>)
    }


    setTimeout(() => {
        somarTudo()
        console.log('teste')
    }, 500);



    return (

        <div>

            <div className="d-block">

                <div>
                    <div className="p-3 bg-danger" >
                        <h5 className="text-center text-white" style={{ fontFamily: "arial-black" }}><span style={{ textTransform: "capitalize" }}>{nomeLista}</span></h5>
                        <h5 className="text-right mt-5 text-white"><span> Total {somaTot.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></h5>
                    </div>

                    <div className="bg-light">
                        <br />
                    </div>

                    <div className="" style={{ width: "100%" }}>


                        <div className="d-flex">
                            <div className="bg-danger col-6">
                                <h6 className="text-center text-white mt-2">Produto</h6>
                            </div>
                            <div className="bg-danger col-3">
                                <h6 className="text-center text-white mt-2">Valor</h6>
                            </div>
                            <div className="bg-danger col-3">
                                <h6 className="text-center text-white mt-2">Qtd</h6>
                            </div>
                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="d-flex ">

                                <div className="bg-danger col-6 pb-1 pl-0">
                                    <input className="mt-2 w-100 bg-danger ml-1 text-white text-center" style={{ borderBottom: "2px solid #fff", borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                        name={"produto"}
                                        id={"produto"}
                                        value={produto}

                                        onChange={(ev) => setProduto(ev.target.value)}
                                    />

                                </div>


                                <div className="bg-danger col-3">
                                    <input className="mt-2 w-100 bg-danger ml-1 text-white text-center" style={{ borderBottom: "2px solid #fff", borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                        name={"valor"}
                                        id={"valor"}
                                        value={valor}
                                        type="number"
                                        onChange={(ev) => setValor(ev.target.value)}
                                        onClick={() => setValor('')}

                                    />
                                </div>


                                <div className="bg-danger col-3">
                                    <input className="mt-2 w-100 bg-danger ml-1 text-white text-center" style={{ borderBottom: "2px solid #fff", borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                        name={"quantidade"}
                                        id={"quantidade"}
                                        value={quantidade}
                                        type="number"
                                        onClick={() => setQuantidade('')}
                                        onChange={(ev) => setQuantidade(ev.target.value)}

                                    />
                                </div>





                            </div>

                            <div>
                                <button className="btn btn-secondary btn-block mt-1"> ++ Adicionar</button>
                            </div>



                        </form>







                    </div>


                    <div className="d-flex bg-light mb-2 mt-4">
                        <div className="col-6 text-center ">Produtos</div>
                        <div className="col-3 ml-4 text-sm-center">R$ Valor</div>
                        <div className="col-3 ml-2 text-sm-center">Qtd</div>
                    </div>

                </div>


                <div className="mt-4" style={{ overflow: "auto", height: "280px" }}>



                    <ul className="ml-0" style={{ listStyle: "none", overflow: "auto" }}>


                        {

                            
                            allDados.map((dados, idx) => {
                                if (dados.usuario._id === userId) {

                                    return (



                                        <li className="w-100 p-2 mt-4" style={{ borderBottom: "0.5px dotted #000" }} key={idx}>

                                            
                                            <div className="" style={{ width: "100%" }}>

                                                <div className="w-100 mr-5 ">

                                                    <p className="p-2 bg-light text-center mt-2 text-success" style={{ fontSize: "25px", textTransform: 'capitalize' }}>{dados.usuario.nome}</p>
                                                </div>

                                                <div className="d-flex p-2">
                                                    <div className=" col-6" style={{ borderRight: "1px solid #ccc" }}>
                                                        <input className=" w-100 p-1 border-0"
                                                            style={{ marginLeft: "-41px" }}
                                                            defaultValue={dados.produto}
                                                            onChange={(ev) => setProdEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputNome(ev.target, dados.produto, dados._id)}
                                                            name="prodEdit"

                                                        />

                                                    </div>


                                                    <div className=" col-4" style={{ borderRight: "1px solid #ccc" }}>


                                                        <input className="w-100 p-1 text-center border-0"
                                                            defaultValue={parseFloat(dados.preco).toFixed(2)}
                                                            onChange={(ev) => setValorEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputPreco(ev.target, dados.preco, dados._id)}
                                                            name="precoEdit"
                                                            type="number"

                                                        />

                                                    </div>
                                                    <div className="col-3">

                                                        <input className="w-100 p-1 text-center border-0"
                                                            defaultValue={dados.quantidade}
                                                            onChange={(ev) => setQuantEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputQuantidade(ev.target, dados.quantidade, dados._id)}
                                                            name="quantEdit"
                                                            type="number"
                                                        />
                                                    </div>
                                                </div>

                                                <div>

                                                    <div className=" d-flex mt-1" style={{ borderRight: "1px solid #ccc" }}>
                                                        <div className="col-6 mt-2" style={{ borderRight: "1px solid #ccc" }}>




                                                            <span className="mt-3" style={{ marginLeft: "-30px" }}>Total =  <span className="pr-1 valores">{parseFloat(dados.preco * dados.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                                            <br />
                                                            <br />
                                                            <span className="mt-3" style={{ marginLeft: "-30px" }}>Status :  <span className="pr-1 valores">{

                                                                dados.status === "Lista" ? <span className="text-danger">{dados.status}</span> : dados.status === "Carrinho" ? <span className="text-info">{dados.status}</span> : <span className="text-success">{dados.status}</span>

                                                            }</span></span>






                                                        </div>

                                                        <div className="col-6 text-center">
                                                            <span onClick={() => removerProduto(dados._id, dados.usuario._id)}><i className="fas fa-trash" style={{ fontSize: '18px' }}></i> Remover </span>
                                                            <br />
                                                            <br />

                                                            {dados.status === 'Lista' ? <button className="btn btn-secondary" onClick={() => changStatus(dados._id, "Carrinho")}>Add ao  Carrinho</button> : <button className="btn btn-secondary" onClick={() => changStatus(dados._id, "Lista")}>Retornar</button>}

                                                        </div>
                                                    </div>




                                                </div>


                                            </div>






                                        </li>


                                    )
                                } else {

                                    return (



                                        <li className="w-100 p-2 mt-4" style={{ borderBottom: "0.5px dotted #000" }} key={idx}>
                                            <div className="" style={{ width: "100%" }}>

                                                <div className="w-100 mr-5 ">

                                                    <p className="p-2 bg-light text-center mt-2 " style={{ fontSize: "25px", textTransform: 'capitalize' }}>{dados.usuario.nome}</p>
                                                </div>

                                                <div className="d-flex p-2">
                                                    <div className=" col-6" style={{ borderRight: "1px solid #ccc" }}>
                                                        <input className=" w-100 p-1 border-0"
                                                            style={{ marginLeft: "-41px" }}
                                                            defaultValue={dados.produto}
                                                            onChange={(ev) => setProdEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputNome(ev.target, dados.produto, dados._id)}
                                                            name="prodEdit"
                                                            readOnly

                                                        />

                                                    </div>


                                                    <div className=" col-4" style={{ borderRight: "1px solid #ccc" }}>


                                                        <input className="w-100 p-1 text-center border-0"
                                                            defaultValue={parseFloat(dados.preco).toFixed(2)}
                                                            onChange={(ev) => setValorEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputPreco(ev.target, dados.preco, dados._id)}
                                                            name="precoEdit"
                                                            type="number"
                                                            readOnly

                                                        />

                                                    </div>
                                                    <div className="col-3">

                                                        <input className="w-100 p-1 text-center border-0"
                                                            defaultValue={dados.quantidade}
                                                            onChange={(ev) => setQuantEdit(ev.target.value)}
                                                            onBlur={(ev) => changeInputQuantidade(ev.target, dados.quantidade, dados._id)}
                                                            name="quantEdit"
                                                            type="number"
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <div>

                                                    <div className=" d-flex mt-1" style={{ borderRight: "1px solid #ccc" }}>
                                                        <div className="col-6 mt-2" style={{ borderRight: "1px solid #ccc" }}>




                                                            <span className="mt-3" style={{ marginLeft: "-30px" }}>Total =  <span className="pr-1 valores">{parseFloat(dados.preco * dados.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                                            <br />
                                                            <br />
                                                            <span className="mt-3" style={{ marginLeft: "-30px" }}>Status :  <span className="pr-1 valores">{

                                                                dados.status === "Lista" ? <span className="text-danger">{dados.status}</span> : dados.status === "Carrinho" ? <span className="text-info">{dados.status}</span> : <span className="text-success">{dados.status}</span>

                                                            }</span></span>






                                                        </div>

                                                        <div className="col-6 text-center">
                                                            <span onClick={() => removerProduto(dados._id, dados.usuario._id)}><i className="fas fa-trash" style={{ fontSize: '18px' }}></i> Remover </span>
                                                            <br />
                                                            <br />

                                                            {dados.status === 'Lista' ? <button className="btn btn-secondary" onClick={() => changStatus(dados._id, "Carrinho")}>Add ao  Carrinho</button> : <button className="btn btn-secondary" onClick={() => changStatus(dados._id, "Lista")}>Retornar</button>}

                                                        </div>
                                                    </div>




                                                </div>


                                            </div>






                                        </li>


                                    )


                                }
                            }

                            )


                        }








                    </ul>




                </div>



                <div className="text-center">
                    <div className="d-flex bg-danger p-2">
                        <div className="col-4" style={{ borderRight: "1px dotted #fff" }}>

                            <button className="btn btn-danger btn-block " onClick={() => getDados()}>Atualizar</button>
                        </div>

                        <div className="col-4 border-1" style={{ borderRight: "1px dotted #fff" }}>
                            <button className="btn btn-danger btn-block " onClick={() => finalList()} >Meus Itens</button>
                        </div>

                        <div className="col-4 border-1">
                            <button className="btn btn-danger btn-block " onClick={() => changStatusGeral('Pago')}>Finalizar</button>
                        </div>
                    </div>

                    {/*<div className="d-flex bg-danger p-2">
                       
                        <div className="col-12 text-center" style={{borderRight:"1px dotted #fff"}}>

                            <button className="btn btn-danger btn-block " onClick={() => document.location.reload()}>Refresh</button>
                        </div>

                       
                    </div>*/}



                    <div>

                        <form onSubmit={handleSubmitAmigos}>

                            <div className="bg-danger col-12 d-flex p-1">
                                <div className="p-1 col-8">
                                    <input
                                        type="text"

                                        value={amigoId}
                                        onChange={(ev) => setAmigoId(ev.target.value)}
                                    />
                                </div>

                                <div className="col-4 pb-1">
                                    <button className="btn btn-light text-danger " type="submit"> + Amigo</button>
                                </div>
                            </div>



                        </form>

                    </div>
                </div>


            </div>




        </div>








    )



}

export default ListaIens;