import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './compenents/Card';

const API_URL = "https://pokeapi.co/api/v2/pokemon"

function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get(`${API_URL}?limit=24`)
        const lista = res.data.results

        const detalhes = await Promise.all(
          lista.map((p) => axios.get(p.url))
        )
        const comImagens = detalhes.map((r) => ({
          nome: r.data.name,
          ordem: r.data.order,
          imagem: r.data.sprites.other['official-artwork'].front_default
        }))
        setPokemons(comImagens)
      } catch (error) {
        console.error("Erro ao buscar pokemons", error)
      }
    }
    fetchPokemons()
  } , [])

  return (
    <div className="App">
      <header>
        <h1>Pokedéx</h1>
      </header>
      <div className='card-container'>
      {pokemons.map((pokemon) => (
        <Card className="pokecard" pokemon={pokemon}/>
      ))}
      </div>
    </div>
  );
}

export default App;
