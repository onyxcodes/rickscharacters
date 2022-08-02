import React, { Component } from "react"


// TODO: add padding beetween items
class ActionBar extends Component {

    render() {
        var barClasses = this.props.position ? "actionbar-container".concat(" "+this.props.position) : "actionbar-container";
        return (
            <div className={barClasses}>
                <div className="actionbar-left">
                    {this.props.items?.map((i, index) => {
                        if (i.position == "left" && i.item) return (<div key={index} className="actionbar-item">{i?.item}</div>)
                    })}
                </div>
                <div className="actionbar-center">
                    {this.props.items?.map((i, index) => {
                        if (i.position == "center" && i.item) return (<div key={index} className="actionbar-item">{i?.item}</div>)
                    })}
                </div>
                <div className="actionbar-right">
                    {this.props.items?.map((i, index) => {
                        if (i.position == "right" && i.item) return (<div key={index} className="actionbar-item">{i.item}</div>)
                    })}
                </div>
            </div>
           
        )
    }
}

export default ActionBar;