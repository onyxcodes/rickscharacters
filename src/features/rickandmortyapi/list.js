import axios from "axios";
import {getPageFromURI} from "./index"

const list = ( page, name, ids ) => {
    return new Promise ( (resolve, reject) => {
        let params = {}
        if (name) params.name = name;
        else params.page = page;
        let url = "https://rickandmortyapi.com/api/character";
        if ( ids && ids.length ) url = url.concat("/"+ids.toString(","));
        else if ( ids ) url.concat("/0");
        axios({
            "method": "GET",
            "url": url,
            "headers": {
                "crossorigin":true,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }, "params": params
        })
        .then(({data}) => {
            data.loading = false;
            data.error = null;
            if (data && data?.results?.length) resolve(data);
            else if ( data && !data.results) {
                // In case there's only a character in the filter
                // the response is formatted differently, handle it
                let newData = {
                    results: [...data],
                    loading: false,
                    error: null
                }
                resolve(newData);
            }
        })
        .catch((error) => {
            error.response.status !== 404 ? console.log(error) : null;
            let data = {
                loading: false,
                error: error.response.status === 404 ? "No data found" : error
            }
            resolve(data)
        })
    });
}

export const listCharacters = ( page = 1 , name = null, ids = null ) => dispatch => {
    // The first dispatch is to mark that we are going to make an async call
    // when it responds, we are going to mark the call as completed
    dispatch({
        type: "LIST",
        payload: {
            loading: true
        }
    });
    // TODO1: Consider adding a timeout
    list(page, name, ids).then( res => {
        if (res) {
            // TODO1: cancel timeout
            dispatch({
                type: "LIST",
                payload: {
                    results: res.results,
                    loading: res.loading,
                    error: res.error,
                    next: getPageFromURI(res.info?.next),
                    previous: getPageFromURI(res.info?.prev),
                }
            })
        }
    })
    // TODO1: If timeout wasn't cancelled dispatch error?
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