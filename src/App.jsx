import './App.css'
import {useState, useEffect} from "react"

import ExibDados from "./components/exibDados.jsx"
import Header from "./components/header.jsx"
import CardPoke from "./components/cardPoke.jsx"
import Rotacao from "./components/spinner.jsx"
import ListandoPoke from './components/listandoPoke.jsx'

import Atributos from './components/atributos.jsx'
function App() {
  const [genAtual, setGen] =useState(0)
  const [listaPoke, setListaPoke] = useState([])
  const [exibirDados, setExibirDados]=useState("")
  
  // ao clicar no pokemon, vai receber seus tipos, que vão ser enviados para os atributos.jsx que vai retornar suas fraquezas, essas fraquezas vão ser usadas por exibiDados.jsx
  const [exibTipos, setExibTipos] =useState("")
  const [fraqueza, setFraqueza] =useState("")

  const [pesquisa, setPesquisa] =useState("")
 

  return (

    <>
      <Header genSelected ={setGen} setPesquisa={setPesquisa}/>
      <ListandoPoke setListaPoke ={setListaPoke}/>
      { exibirDados !=="" && (
      <ExibDados pokemon={exibirDados-1} listaPoke={listaPoke} pokeSelect={setExibirDados} selected={exibirDados} setExibTipos={setExibTipos} fraqueza={fraqueza}/>  
   
    )
    }
    {exibTipos!=[]&&<Atributos exibTipos={exibTipos}setFraqueza={setFraqueza}/>
          }
      
      {pesquisa ===""?(
        <CardPoke 
          genAtual ={genAtual} 
          listaPoke={listaPoke}
          pokeSelect={setExibirDados}
          pesquisa = {pesquisa}
          />
          
      ):(
        <CardPoke
          genAtual ={genAtual}
          listaPoke={listaPoke}
          pokeSelect={setExibirDados}
          pesquisa = {pesquisa}
          />)
          
      }
      
      
    </>
  )
}

export default App
