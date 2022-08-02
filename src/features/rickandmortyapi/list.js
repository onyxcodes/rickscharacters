import axios from "axios";

const list = ( page ) => {
    return new Promise ( (resolve, reject) => {
        axios({
            "method": "GET",
            "url": "https://rickandmortyapi.com/api/character",
            "headers": {
                "crossorigin":true,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }, "params": {
                "page": page,
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

const getPageFromURI = (uri) => {
    if ( uri ) {
        var url = new URL(uri)
        var urlParams = new URLSearchParams(url.search);
        var page = urlParams.get('page');
        return page;
    } else return null;
}

export const listCharacters = ( page = 1) => dispatch => {
    // The first dispatch is to mark that we are going to make an async call
    // when it responds, we are going to mark the call as completed
    dispatch({
        type: "LIST",
        payload: {
            loading: true
        }
    });
    list(page).then( res => {
        if (res) {
            console.log("list - got res", res);
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