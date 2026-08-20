import {useState, useEffect} from "react"
import "./componentsCSS/exibDados.css"
import "./componentsCSS/cores.css"
import Rotacao from "./spinner.jsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced, faRulerVertical, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { width } from "@fortawesome/free-solid-svg-icons/fa0";

function ExibDados({pokemon, listaPoke, pokeSelect, selected, setExibTipos, fraqueza}){
   const dados= listaPoke[pokemon]
    const [dadosDetalhados, setDadosDetalhados] =useState("")
   useEffect(()=>{

    if(selected != ""){

        async function novosDados() {
            const buscandoDados = await fetch(`https://pokeapi.co/api/v2/pokemon/${selected}`);
            const pesExtra = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selected}`)

            const convertendo = await buscandoDados.json()
            const convertendoExtra = await pesExtra.json()
            
            // buscando a linha evolutiva

            const buscandoEvo = await fetch(convertendoExtra.evolution_chain.url)
            const respBuscandoEvo = await buscandoEvo.json()


            //formatando o texto recebido
            let traducao;
            const traducaoSalva = localStorage.getItem(`traducao_${dados.nome}`)
            if(traducaoSalva){
                traducao = traducaoSalva
            }else{
                 const formatado = convertendoExtra.flavor_text_entries[0]
                 .flavor_text
                 .replace(/[\n\f]/g, " ")
                 .trim();

                 //usando uma outra ap para traduzir o texto, já formatado!
                 const tradu = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(formatado)}&langpair=en|pt`)

                 const traduResp = await tradu.json();
                
                 traducao = traduResp.responseData.translatedText;
                 localStorage.setItem(`traducao_${dados.nome}`, traducao)
    
            }
           
            const dadosExtra ={
                ...listaPoke[pokemon], 
                weight: convertendo.weight,
                height: convertendo.height,
                generation: convertendoExtra.generation,
                habitat: convertendoExtra.habitat?.name ?? "desconhecido",
                text: traducao,
                stats: convertendo.stats

            }
            setDadosDetalhados(dadosExtra);
            const corPrincipal = getComputedStyle(document.documentElement).getPropertyValue(`--cor${dados.types[0]}`);
            document.documentElement.style.setProperty(
            "--corPrincipal",
            corPrincipal
                 );
   
            
            
            setExibTipos(dados.types)
        }
        novosDados()

   }
    
    
   },[selected])

    return(
        <>
            {dadosDetalhados ===""?
            (
            <section className="dadosPoke">
                <span> Carregando...<Rotacao /></span> 
            </section>
            )
            :(
                <section className="dadosPoke">

                
                <button 
                className="mudandoPoke" 
                 onClick={()=> {if(selected>1){
                    setDadosDetalhados("");
                    pokeSelect(selected -1)
                 }}}>{<FontAwesomeIcon icon={faArrowLeft} />}</button>
                <div className="divDados">
                    < div className="conteudo">
                        <div className="conteudo-poke">

                            
                        <div className="ladoEsquerdo">
                            <p className="numeracao">N° {String(dados.id).padStart(3, "0")}</p>
                            <div className="topoEsquerdo">
                                <img src={dados.img} loading="lazy"/> 
                            </div>
                            <div className="DadosEsquerdo">
                                <div className="corpoPoke">
                                <div className="dadosCorpo">
                                    <FontAwesomeIcon icon={faRulerVertical} />
                                    <div className="altura>">
                                        <p><strong>{dadosDetalhados.height /10}.0 m</strong></p>
                                        <p>Altura</p>
                                    </div>
                                <hr className="linhaVertical"/>

                                </div>
                                
                                <div className="dadosCorpo">
                                    <FontAwesomeIcon icon={faScaleBalanced} />
                                    <div className="peso">
                                        <p><strong>{dadosDetalhados.weight / 10}.0 Kg</strong></p>
                                        <p>Peso</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sobrePoke">
                                <h3><strong>Sobre {dados.nome}</strong></h3>
                                <p>
                                    {dadosDetalhados.text}
                                </p>
                            </div>



                                
                            </div>
                            
                        </div>
                        {(
                         <div className="ladoDireito">
                            <h1 className="nome">{dados.nome}</h1>
                            <div className="conteinerTipos">
                                 {dados.types.map(tipo=> 
                                        (<span 
                                            className={`tipos ${tipo}`}
                                            key={tipo}>
                                                <img src={`https://raw.githubusercontent.com/hexparrot/pokemon-assets/master/assets/svg/types/${tipo}.svg`}
                                                        alt={tipo}/>
                                                        {tipo}
                                        </span>))
                                    }
                            </div>
                            
                           
                            <hr/>
                            <div className="inf">
                                <h3>Atributos Base</h3>
                                <div className="dadosAtributos">
                                    {dadosDetalhados.stats.map(status =>(<div className="conteiner"
                                        key={status.stat.name}>
                                        <span className={`nameStts ${status.stat.name}`} >{status.stat.name}</span>
                                        <div className="containerProgress">
                                            <div
                                                className={
                                                    `prog prog${status.stat.name}
                                                 `}   
                                                 style={{
                                                    width:`${status.base_stat}%`
                                                 }}>
                                            </div>
                                            
                                        </div>
                                        {status.base_stat}
                                        
                                    </div>))}
                                    <hr />
{/*===============================================================================
                                     >>>>  FRAQUEZAS  <<<<<
*/}
                                    <h3>Fraquezas</h3>
                                    <div className="contFraquezas">
                                        {fraqueza!=[]&&fraqueza.map(tipo=>(
                                            <span 
                                                className={`tipos ${tipo}`}
                                                key={tipo}>
                                                    <img src={`https://raw.githubusercontent.com/hexparrot/pokemon-assets/master/assets/svg/types/${tipo}.svg`}
                                                     alt={tipo}/>
                                                    {tipo}

                                            </span>))}


                                    </div>
                                    
                                </div>
                            </div>
                        </div>  
                            
                        )}
                       
                    
                    
                    </div>
                    </div>
                    <button className="close"  onClick={()=> pokeSelect("")}>{<img src="src/assets/pokebolla-t.png"/>}Fechar</button>
                </div>
                <button className="mudandoPoke" onClick={()=> pokeSelect(selected+1, setDadosDetalhados(""))}>{<FontAwesomeIcon icon={faArrowRight} />}</button>
            </section>
            )}
            
            
        </>
    )
}

export default ExibDados