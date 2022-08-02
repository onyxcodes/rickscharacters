import React, { Component } from "react"

class Card extends Component {
    componentDidMount() {
        // TOCO
    }
    render() {
        const { data, size, openDetails } = this.props;
        var cardClasses = size ? "card".concat(" "+size) : "card";
        return(
            <div 
                className={cardClasses}
                onClick={() => openDetails(data)}
            >
                <div className="card-hero" style={{
                    backgroundColor: this.props.color || "#999999",
                    backgroundImage: data?.image ? "url("+data?.image+")" : null
                }}></div>
                <span className="card-title">{data.name}</span>
            </div>
        )
    }
}

export default Card;