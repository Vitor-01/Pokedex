import "./componentsCSS/header.css"
import {useState} from "react"



function Header({genSelected, setPesquisa}){
    const [exibir, setExib]= useState(false)
    const listGen = [
        {id:0, text:"1° Geração"},
        {id:1, text:"2° Geração" },
        {id:2, text:"3° Geração"},
        {id:3, text:"4° Geração"},
        {id:4, text:"5° Geração" },
        {id:5, text:"6° Geração" },
        {id:6, text:"7° Geração" },
        {id:7, text:"8° Geração"},
        {id:8, text:"9° Geração"}
    ]
    return(
        <>


            <div className="header">
                <div className="topHea">
                    <h1>Pokedex</h1>
                    <input onChange={(pesquisa)=>{ setPesquisa(pesquisa.target.value)
                    }}/>
                    
                    <button/>
                </div>
                <div className="bottomHea">
                    <nav>
                        <button onClick={()=> { setExib(exibir?false:true)}}>Geração {exibir?"▲":"▼"}</button>
                    </nav>
                </div>
                
            </div>
            {exibir && (<div className="selectGen">
                    {listGen.map(itemList => (
                        <button key ={itemList.id}onClick ={() => genSelected(itemList.id)}>{itemList.text}</button>
                    ))}</div>)}
        
        </>
    )
}

export default Header