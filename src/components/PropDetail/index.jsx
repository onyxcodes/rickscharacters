import React, {Component} from "react";

import { getEpisodeFromURI } from "../../features/rickandmortyapi";

class PropDetail extends Component {
    
    render() {
        const { propName, propType, value } = this.props;
        var prop, detailClasses = "propDetail";
        console.log("Got propType", propType)
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
                    <ul className="propDetail-value-container">
                        {value.map( (element, index) => {
                            return <li key={index} className="propDetail-value">
                                {"📺 ".concat(getEpisodeFromURI(element))}
                            </li>
                        })}
                    </ul>
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