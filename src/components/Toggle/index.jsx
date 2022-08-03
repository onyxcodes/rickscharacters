import React, { Component } from "react";

class Toggle extends Component {
    render() {
        const { id, checked, label, onChange } = this.props;
        return (
            <div className="toggle">
                <input id={id} name={id}
                    onChange={ (e) => onChange(e.target.checked)}
                    type="checkbox"
                    checked={checked}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        )
    }
}

export default Toggle;