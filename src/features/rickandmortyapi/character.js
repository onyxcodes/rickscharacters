import axios from "axios";

const character = (id) => {
    let param;
    if (id != null && !isNaN(id)) param = id;
    else throw Error("Missing parameter id or name for fetching Pokemon data");
    return new Promise((resolve, reject) => {
        axios({
            "method": "GET",
            "url": "https://rickandmortyapi.com/api/character/" + param,
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

export const getCharacter = (id) => dispatch => {
    dispatch({
        type: "CHARACTER",
        payload: {
            loading: true
        }
    });
    character(id, name).then(res => {
        if (res?.id) {
            dispatch({
                type: "CHARACTER",
                payload: res
            })
        }
    });
}

export default function reducer(state = null, action) {
    switch (action.type) {
        case "CHARACTER": {
            return action.payload || null
        }
        default:
            return state;
    }
}