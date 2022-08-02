import React, { Component} from "react";

class Loader extends Component {
    render() {
        if ( this.props.show ) {
            return <div className="loader">Loading</div>
        } else return null;
    }
}

export default Loader;