import React, {Component} from "react";

import { getEpisodeFromURI } from "../../features/rickandmortyapi";

const renderEpisodeList = ( episodeList ) => {
    let list = <ul className="propDetail-value-container">
        {episodeList.map( (element, index) => {
            let episode = getEpisodeFromURI(element);
            return <li key={index} className="propDetail-value"><button title={"Episode ".concat(episode)}>
                    {"📺 ".concat(episode)}
            </button> </li>
        })}
    </ul>
    return list;
}

class PropDetail extends Component {
    
    render() {
        const { propName, propType, value } = this.props;
        var prop, detailClasses = "propDetail";
        switch(propType) {
            case "string":
            case "number":
                detailClasses = detailClasses.concat(" inline");
                prop = <div className={detailClasses}>
                    <span className="title">{propName}</span>
                    <div className="propDetail-value">{value}</div>
                </div>
                break;
            case "text":
                prop = <div className={detailClasses}>
                    <span className="title">{propName}</span>
                    <div className="propDetail-value">{value}</div>
                </div>
                break;
            case "list":
                if ( !(value instanceof Array) ) throw new Error("PropDetail - For list prop types, value must be an array");
                prop = <div className={detailClasses}>
                    <span className="title">{propName}</span>
                    {renderEpisodeList(value)}
                </div>
                break;
            default:
                return null;
        }
        return(
           <>
            {prop}
           </>
        )
    }
}

export default PropDetail;