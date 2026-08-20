import {useState, useEffect} from "react"
import ListandoPoke from "./listandoPoke.jsx"
import ExibDados from "./exibDados.jsx"
import Rotacao from "./spinner.jsx"

import "./componentsCSS/cardPoke.css"
import "./componentsCSS/pokeTipes.css"
function CardPoke({genAtual, listaPoke, pokeSelect, pesquisa}){
    const [estado, setEstado] =useState(false)
    useEffect(() => {
        if(listaPoke.length>0){
            setEstado(true)
        }
    },[listaPoke])
   
     const dadosGen = [
        {inicio :1 , fim:151},
        {inicio :152 , fim:251},
        {inicio :252, fim:386},
        {inicio :387 , fim:493},
        {inicio :494 , fim:649},
        {inicio :650 , fim:721},
        {inicio :722 , fim:809},
        {inicio :810 , fim:905},
        {inicio :906 , fim:1025},
    ]
   
    
    function chamar(n){
           pokeSelect(n)
        }
       
        const lista = pesquisa ===""?
            listaPoke.slice(dadosGen[genAtual].inicio -1, dadosGen[genAtual].fim)
        : 
            listaPoke.filter(poke => 
                 poke.nome.startsWith(pesquisa.toLowerCase()))
    return(
        
        <section className="estrutura">
            {estado?( 
                lista.length>0?(
                     <div className="exibirPoke">
                {lista.map(pokemon =>(
                                    <div key={pokemon.id} className="cardPoke"
                                    onClick={() => chamar(pokemon.id)}
                                    >
                                        <p >N° {String(pokemon.id).padStart(3, "0")}</p>
                                        <img
                                            src={pokemon.img}
                                            loading="lazy"
                                        />
                                        <p className="nomePoke">{pokemon.nome}</p>
                                        
                                        <div className="tipos">
                                            {pokemon.types.map(tipo =>(<span
                                                className={tipo}
                                                key={tipo}>
                                                    {tipo}
                                            </span>))}
                                        </div>
                                        </div>
                     )) }           
                    </div>
                )
               
                :
                <p>Não foram encontrados resultados para essa pesquisa!</p>
                ):<span> Carregando...<Rotacao /></span>}
             
            
            
       </section>
          
        
    )
}

export default CardPoke