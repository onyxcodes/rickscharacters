import axios from "axios";

const pokemon = (id, name) => {
    let param;
    if (id != null && !isNaN(id)) param = id;
    else if (name != null) param = name;
    else throw Error("Missing parameter id or name for fetching Pokemon data");
    return new Promise((resolve, reject) => {
        axios({
            "method": "GET",
            // "url": "/pokeapi/pokemon",
            "url": "https://pokeapi.co/api/v2/pokemon/" + param,
            "headers": {
                "crossorigin": true,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }
        })
            .then(({ data }) => {
                if (data?.id) resolve(data)
            })
            .catch((error) => {
                console.log(error)
            })
    });
}

export const getPokemon = (id, name) => dispatch => {
    dispatch({
        type: "POKEMON",
        payload: {
            loading: true
        }
    });
    pokemon(id, name).then(res => {
        if (res?.id) {
            dispatch({
                type: "POKEMON",
                payload: res
            })
        }
    });
}

export default function reducer(state = null, action) {
    switch (action.type) {
        case "POKEMON": {
            return action.payload || null
        }
        default:
            return state;
    }
}