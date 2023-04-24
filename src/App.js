import React from 'react';
import './App.css'
import pokedexIcon from './assets/pokedex-icon.jpg'

//ICONS
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

//COMPONENTS
import PokeCard from './Components/PokeCard';

// API KEY
// https://pokeapi.co/docs/v2

function App() {
  //establishing state
  const [pokemonList, setPokemonList] = React.useState([]);
  const [searchedPokemon, setSearchedPokemon] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pokemonListCount, setPokemonListCount] = React.useState(15);
  const [isDivVisible, setIsDivVisible] = React.useState(false);

  //renders default list of pokemon
  React.useEffect(() => {
    async function fetchData() {
      // grabbing data from API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonListCount}`);
      //awaiting and storing the data fetched into a json format
      const data = await response.json();
      // looping through the data and grabbing/storing the pokemon URLs
      const pokemonUrls = data.results.map((result) => result.url);
      // extracting the data from the URL and fetching the specific pokemon URL
      const pokemonResponses = await Promise.all(pokemonUrls.map((url) => fetch(url)));
      //storing the data fetched
      const pokemonData = await Promise.all(pokemonResponses.map((response) => response.json()));
      const pokemon = pokemonData.map(pokemon => ({
        name: pokemon.name,
        id: pokemon.id, 
        sprite: pokemon.sprites.front_default,
        type: pokemon.types
      }));
      //updating state
      setPokemonList(pokemon);
    }

    //calling the function
    fetchData();
  }, [pokemonListCount]);


  //scroll button functionality
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShowDiv = scrollPosition >= 1000; // Change 500 to the desired scroll position
      setIsDivVisible(shouldShowDiv);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // functions for search
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value === ""){
      setSearchedPokemon(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchPokemon(searchTerm);
  };

  async function searchPokemon(pokemonName){
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const pokemon = {
        name: data.name,
        id: data.id, 
        sprite: data.sprites.front_default,
        type: data.types
      };
      setSearchedPokemon(pokemon);
    } catch (error) {
      console.error("Error fetching pokemon data: ", error);
      return null;
    }
  }

  return (
    <div className="box-border m-0 text-base leading-none bg-zinc-950 h-screen text-white flex flex-col">

      {/* Navbar */}
      <div className="bg-neutral-900 h-14 flex justify-center border-b-2 border-solid border-indigo-500">
        <img src={pokedexIcon} alt="pokedex icon" className="h-full cursor-pointer"/>
      </div>

      {/* TITLE */}
      <div className="mx-auto mt-16 text-center text-indigo-500">
        <h1 className="text-5xl md:text-7xl font-montserrat font-bold">Keplar's Pokédex</h1>
      </div>

      {/* SEARCH BOX */}
      <div>
        <form className="bg-neutral-900 w-4/5 mx-auto mt-9 flex justify-between max-w-4xl h-14 items-center rounded-30 mb-20" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search Pokemon..." 
            className="bg-inherit w-full h-11 ml-4 border-none outline-none font-montserrat text-lg font-md" 
            maxLength={15}
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="h-full min-w-50 w-1/12 bg-indigo-500 rounded-search flex items-center cursor-pointer" type="submit">
            <SearchIcon fontSize="large" className="mx-auto"/>
          </button>
        </form>
      </div>

      {/* POKECARD VIEW */}
      <div className="w-fit max-w-7xl mx-auto flex flex-col items-center sm:grid sm:gap-10 sm:grid-cols-2 md:grid md:gap-8 md:grid-cols-3 lg:grid lg:gap-8 lg:grid-cols-4">
        {searchTerm === "" && pokemonList.map(pokemon =>(
          <PokeCard sprite={pokemon.sprite} id={pokemon.id} name={pokemon.name} type={pokemon.type} key={pokemon.name}/>
        ))
        }

        {searchedPokemon &&
          <PokeCard sprite={searchedPokemon.sprite} id={searchedPokemon.id} name={searchedPokemon.name} type={searchedPokemon.type}/>
        }
      </div>

      {/* LOAD MORE POKEMON */}
      {searchTerm === "" &&
        <button
        onClick={() => {setPokemonListCount(pokemonListCount*2)}}
        className="bg-indigo-500 px-10 py-4 mx-auto rounded-30 font-md text-lg hover:bg-indigo-600"
        >Load more pokemon</button> 
      }

      {/* WHITE SPACE AT THE BOTTOM OF THE WEBSITE */}
      <div className="bg-inherit py-20">

      </div>

      {/* SCROLL UP BUTTON */}
      {isDivVisible && (
        <div 
        className="sticky bottom-5 ml-auto right-5 border-2 border-solid border-indigo-500 bg-inherit cursor-pointer p-1"
        onClick={scrollToTop}
        >
          <ArrowUpwardIcon fontSize="large"/>
      </div>
      )}
    </div>
  );
}

export default App;
