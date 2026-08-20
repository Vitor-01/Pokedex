import {useState, useEffect} from "react"


function Atributos({setFraqueza, exibTipos}){
const ListaAtributos = [

        {
            nome: "bug",
            fraqueza: ["fire", "flying", "rock"],
            resistência: ["fighting", "grass", "ground"],
            imunidade: []
        },

        {
            nome: "dark",
            fraqueza: ["bug", "fairy", "fighting"],
            resistência: ["dark", "ghost"],
            imunidade: ["psychic"]
        },

        {
            nome: "dragon",
            fraqueza: ["dragon", "fairy", "ice"],
            resistência: ["electric", "fire", "grass", "water"],
            imunidade: []
        },

        {
            nome: "electric",
            fraqueza: ["ground"],
            resistência: ["electric", "flying", "steel"],
            imunidade: []
        },

        {
            nome: "fairy",
            fraqueza: ["poison", "steel"],
            resistência: ["bug", "dark", "fighting"],
            imunidade: ["dragon"]
        },

        {
            nome: "fighting",
            fraqueza: ["fairy", "flying", "psychic"],
            resistência: ["bug", "dark", "rock"],
            imunidade: []
        },

        {
            nome: "fire",
            fraqueza: ["ground", "rock", "water"],
            resistência: ["bug", "fairy", "fire", "grass", "ice", "steel"],
            imunidade: []
        },

        {
            nome: "flying",
            fraqueza: ["electric", "ice", "rock"],
            resistência: ["bug", "fighting", "grass"],
            imunidade: ["ground"]
        },

        {
            nome: "ghost",
            fraqueza: ["dark", "ghost"],
            resistência: ["bug", "poison"],
            imunidade: ["fighting", "normal"]
        },

        {
            nome: "grass",
            fraqueza: ["bug", "fire", "flying", "ice", "poison"],
            resistência: ["electric", "grass", "ground", "water"],
            imunidade: []
        },

        {
            nome: "ground",
            fraqueza: ["grass", "ice", "water"],
            resistência: ["poison", "rock"],
            imunidade: ["electric"]
        },

        {
            nome: "ice",
            fraqueza: ["fighting", "fire", "rock", "steel"],
            resistência: ["ice"],
            imunidade: []
        },

        {
            nome: "normal",
            fraqueza: ["fighting"],
            resistência: [],
            imunidade: ["ghost"]
        },

        {
            nome: "poison",
            fraqueza: ["ground", "psychic"],
            resistência: ["bug", "fairy", "fighting", "grass", "poison"],
            imunidade: []
        },

        {
            nome: "psychic",
            fraqueza: ["bug", "dark", "ghost"],
            resistência: ["fighting", "psychic"],
            imunidade: []
        },

        {
            nome: "rock",
            fraqueza: ["fighting", "grass", "ground", "steel", "water"],
            resistência: ["fire", "flying", "normal", "poison"],
            imunidade: []
        },

        {
            nome: "steel",
            fraqueza: ["fighting", "fire", "ground"],
            resistência: ["bug","dragon","fairy", "flying","grass","ice","normal","psychic","rock", "steel"],
            imunidade: ["poison"]
        },

        {
            nome: "water",
            fraqueza: ["electric", "grass"],
            resistência: ["fire", "ice", "steel", "water"],
            imunidade: []
        }


    ];

useEffect(()=>{
    

    const pokeType = exibTipos ??[]
    const comparando = pokeType.map(tipe =>
        ListaAtributos.find(atributo =>(atributo.nome === tipe)));
    // juntando apenas os dados correnspondentes dentro da variavel e ja removendo os valores repetidos
    let filtFraqueza =[...new Set(comparando.flatMap(fraqueza => fraqueza.fraqueza))]

    let filtResistencia =[...new Set(comparando.flatMap(resistencia => resistencia.resistência))]

    const filtImunidade =[...new Set(comparando.flatMap(imunidade => imunidade.imunidade))]

    //separando os valores que se repetem ao comparar fraqueza e resistencia
    const repetidos = filtFraqueza.filter(tipos => filtResistencia.includes(tipos))

    //removendo esses valores, uma fraqueza anula uma resistencia repetidida, 1-1 =0
    filtFraqueza = filtFraqueza.filter(tipos => !repetidos.includes(tipos))

            //removendo apenas os valores de imunidade da resistencia, se ele é imune, não tem como receber essa fraqueza.
    filtFraqueza = filtFraqueza.filter(tipos => !filtImunidade.includes(tipos))

    //removendo esses valores, uma fraqueza anula uma resistencia repetidida, 1-1 =0
    filtResistencia = filtResistencia.filter(tipos => !repetidos.includes(tipos))
    const juntando = {
        nomes:[...new Set(comparando.flatMap(nome => nome.nome))],

        fraquezas: filtFraqueza,

        resistencias:filtResistencia,

        imunidades:filtImunidade
    }

    // mandando as fraquezas
    setFraqueza(juntando.fraquezas)

},[exibTipos])




    
    return (
        <>
        </>


    )
}
export default Atributos