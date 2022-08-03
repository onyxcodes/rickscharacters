import axios from "axios";
import {getPageFromURI} from "./index"

const list = ( page, name ) => {
    return new Promise ( (resolve, reject) => {
        let params = {}
        if (name) params.name = name;
        else params.page = page;
        axios({
            "method": "GET",
            "url": "https://rickandmortyapi.com/api/character",
            "headers": {
                "crossorigin":true,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }, "params": params
        })
        .then(({data}) => {
            if (data && data?.results?.length) resolve(data)
        })
        .catch((error) => {
            console.log(error)
        })
    });
}

export const listCharacters = ( page = 1 , name = null) => dispatch => {
    // The first dispatch is to mark that we are going to make an async call
    // when it responds, we are going to mark the call as completed
    dispatch({
        type: "LIST",
        payload: {
            loading: true
        }
    });
    // TODO: start a timeout
    list(page, name).then( res => {
        if (res) {
            // TODO: cancel timeout
            dispatch({
                type: "LIST",
                payload: {
                    // count: res.count,
                    results: res.results,
                    next: getPageFromURI(res.info?.next),
                    previous: getPageFromURI(res.info?.prev),
                }
            })
        }
    })
    // TODO: If timeout wasen't cancel dispatch error?
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