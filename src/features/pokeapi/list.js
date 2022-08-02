import axios from "axios";

const list = ( offset, limit ) => {
    return new Promise ( (resolve, reject) => {
        axios({
            "method": "GET",
            "url": "https://pokeapi.co/api/v2/pokemon",
            "headers": {
                "crossorigin":true,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }, "params": {
                "offset":offset,
                "limit":  limit
            }
        })
        .then(({data}) => {
            if (data && data?.results?.length) resolve(data)
        })
        .catch((error) => {
            console.log(error)
        })
    });
}

export const listPokemon = (offset = 0, limit = 24) => dispatch => {
    // The first dispatch is to mark that we are going to make an async call
    // when it responds, we are going to mark the call as completed
    dispatch({
        type: "LIST",
        payload: {
            loading: true
        }
    });
    list(offset, limit).then( res => {
        if (res) {
            dispatch({
                type: "LIST",
                payload: {
                    count: res.count,
                    results: res.results,
                    next: res.next ? {
                        offset: (offset || 0) + limit,
                        limit: limit
                    } : null,
                    previous: res.previous ? {
                        offset: (offset || 0) - limit,
                        limit: limit
                    } : null
                }
            })
        }
    })
}

export default function reducer(state = null, action) {
  switch(action.type) {
    case "LIST": {
        return action.payload || null;
    }
    default:
      return state;
  }
}