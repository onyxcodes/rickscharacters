import React, { Component } from "react"

class Card extends Component {
    componentDidMount() {
        // TOCO
    }
    render() {
        var cardClasses = this.props.size ? "card".concat(" "+this.props.size) : "card";
        var data = {
            current: this.props.title,
            next: this.props.next,
            previous: this.props.previous
        }
        return(
            <div 
                className={cardClasses}
                onClick={() => this.props.openDetails(data)}
            >
                <div className="card-hero" style={{
                    backgroundColor: this.props.color || "#999999",
                    // backgroundImage: this.props.image 
                }}></div>
                <span className="card-title">{this.props.title}</span>
            </div>
        )
    }
}

export default Card;