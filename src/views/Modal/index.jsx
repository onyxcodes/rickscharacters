import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { getCharacter } from "../../features/rickandmortyapi/character";

import ActionBar from "../../components/ActionBar";
import Loader from "../../components/Loader";

class Modal extends Component {
    
    // TODO: on component mount fetch deatils through given id or name
    componentDidMount() {
        // this.props.getCharacter(this.props.data?.id);
    }

    render() {
        const { size, visible, data, isLoading, character, addToFavorites, closeModal } = this.props;
        var modalClasses = size ? "modal".concat(" "+size) : "modal";
        var modalFgClasses  = visible ? "modal-fg".concat(" "+"visible") : "modal-fg";
        return(
            <div className={modalFgClasses}>
                <div className={modalClasses}>
                    <ActionBar position="top"
                        items={[
                            { item: <span>{data?.name}</span>, position: "center" },
                            { item: <button onClick={() => addToFavorites(data?.id)}>Add to favorites</button>, position: "right"},
                            { item: <button onClick={() => closeModal()}>Close</button>, position: "right"}
                        ]}
                    />
                    <Loader show={isLoading} />
                    {/* TODO: Add loader while fetching additional details */}
                    <div className="modal-content">
                        <div 
                            className="modal-content-hero"
                            style={{
                                backgroundImage: data?.image ? "url("+data?.image+")" : ""
                            }}
                        >&nbsp;</div>
                        <div className="modal-content-details">
                            <ul>
                                <li>Some detail</li>
                            </ul>
                        </div>
                    </div>
                    <ActionBar position="bottom"
                        items={[
                            { item: <button disabled={!data.next} onClick={() => this.openNextDetails(data)}>Next</button>, position: "right"},
                            { item: <button disabled={!data.previous} onClick={() => this.openPreviousDetails(data)}>Previous</button>, position: "left"}
                        ]}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({character}) {
    let isLoading = false; // this when the compoenent is first mounted
    if (character && character?.id) {
        console.log("Modal - Recieved data", character)
        isLoading = false; 
        return { character, isLoading }
    }
    return { character: null, isLoading: character?.loading || isLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getCharacter}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);