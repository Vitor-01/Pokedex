import { useEffect, useState } from "react"

import Header from "./header.jsx"
function ListandoPoke({setListaPoke}){
    
    useEffect(()=>{

        async function buscandoPokeLista(){
            

            const tesk=[];//vai armazenar as funções, sem chamalas
             for(let contador=1; contador<1026; contador++){
                tesk.push(async ()=>{
                    const numero = contador;
                    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)

                    const dados = await resposta.json()
                   
                    return{

                        id: dados.id,
                        nome:dados.name,
                        img: dados.sprites.other["official-artwork"].front_default,
                        types: dados.types.map(tipo => tipo.type.name)
                    }
                })};
                async function limitarPesquisa(tesk){
                   
                    const resultados =[]; // armazem dos resultados da pesquisa
                    let proximaTarefa = 0; //diz qual é a tarefa atual


                    async function pesquisador(){
                        while(proximaTarefa<tesk.length)/*diz que enquanto o valor de proxima tarefa for menor que a quantidade de arrays dentro de tesk, faça:*/{
                            const indice =proximaTarefa; //indica o valor do indice atual;
                            proximaTarefa++; //assim que pega o vallor atual para indice, soma +1 ao valor de proxtaref, para não ter seu uso repetido.

                            resultados[indice] = await tesk[indice]()//pega o resultado de indice atual e o tesk de valor atual/correspondente.

                        }
                    }
                    const limite = 10; //limitador da pesquisa
                    const pesquisando =[]; //onde a pesquisa vai acontecer
                    for(let i=0; i<limite; i++ ){

                        pesquisando.push(pesquisador()) //inicia e guarda a promise da pesquisa
                    }
                    await Promise.all(pesquisando)// espera todas as promise de pesquisando terminarem para depois as retornar ->
                    return resultados;
                }
                 const resultados = await limitarPesquisa(tesk);//espera a pesquisa acontecer para receber o seu valor

                    setListaPoke(resultados);//manda os resultados dentro do estate ListaPoke
        }                

        buscandoPokeLista()

    },[])

   

    return(
        <>
          
        </>
    )
}
                


            
export default ListandoPoke