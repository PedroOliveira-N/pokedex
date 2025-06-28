import './Card.css';

function Card ({pokemon}) {
    return(
        <div className="pokecard">
            <img src={pokemon.imagem}/>
            <h2>{pokemon.nome}</h2>
            <h2>{pokemon.ordem}</h2>
        </div>   
    )
}

export default Card