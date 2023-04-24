import React from 'react';

export default function PokeCard(props){

    function style(type){
        if(type === "bug"){
            return {background: "#729f40"}
        }

        if(type === "fire"){
            return {background: "#fd7d24"}
        }

        if(type === "ghost"){
            return {background: "#7b62a3"}
        }

        if(type === "normal"){
            return {background: "#a4acae", color:"#000"}
        }

        if(type === "psychic"){
            return {background: "#f366b9"}
        }

        if(type === "steel"){
            return {background: "#9eb7b8", color:"#000"}
        }

        if(type === "dark"){
            return {background: "#707070"}
        }

        if(type === "electric"){
            return {background: "#eed535", color:"#000"}
        }

        if(type === "fighting"){
            return {background: "#d56723"}
        }

        if(type === "grass"){
            return {background: "#9bcc50", color:"#000"}
        }

        if(type === "ice"){
            return {background: "#51c3e7", color:"#000"}
        }

        if(type === "poison"){
            return {background: "#ba7fc9"}
        }

        if(type === "rock"){
            return {background: "#a38b20"}
        }

        if(type === "water"){
            return {background: "#4592c3"}
        }

        if(type === "dragon"){
            return {background: "#f16e57"}
        }

        if(type === "fairy"){
            return {background: "#fdb9e9"}
        }

        if(type === "ground"){
            return {background: "#ab9842", color:"#000"}
        }

        if(type === "flying"){
            return {background: "#3dc8ef", color:"#000"}
        }
    }
    return(
        <div className="bg-neutral-900 h-90 w-72 rounded-30 mb-10 flex flex-col border-2 border-solid border-indigo-800 hover:border-b-4 ease-in-out duration-200 cursor-pointer">

            <img src={props.sprite} alt={props.name} className="h-60 w-60 mx-auto my-auto"/>

            <div className="mt-auto h-24 bg-zinc-950 rounded-name">
                <p className="text-zinc-500 mt-2 ml-2">#{props.id}</p>
                <p className="font-md ml-2 text-lg md:text-xl">{props.name}</p>
                <div className="flex ml-2">
                    {props.type.map(type => (
                        <div className="px-6 py-1 ml-2 rounded-md" style={style(type.type.name)}>{type.type.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}