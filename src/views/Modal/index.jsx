import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { getCharacter } from "../../features/rickandmortyapi/character";

import ActionBar from "../../components/ActionBar";
import Loader from "../../components/Loader";
import PropDetail from "../../components/PropDetail";

// TODO: Consider changing Modal into a class that will be extended by:
// CharacterDetail
// EpisodeDetail

// TODO: based on the data prop, decide wether to fetch additional data
class Modal extends Component {
    
    // TODO: on component mount fetch deatils through given id or name
    componentDidMount() {
        // this.props.getCharacter(this.props.id);
    }

    render() {
        const { size, visible, data, isLoading, character, favorites, addToFavorites, removeFromFavorites, closeModal } = this.props;
        var modalClasses = size ? "modal".concat(" "+size) : "modal";
        var modalFgClasses  = visible ? "modal-fg".concat(" "+"visible") : "modal-fg";
        var details;
        console.log("Got data", data)
        if (data) details =Object.entries(data).map( ( [key, value], index) => {
            // TODO: consider moving distinction into propType
            if ( ["status", "species", "gender"].includes(key) ) {
                return <PropDetail 
                    key={index}
                    propType="string"
                    propName={key}
                    value={value}
                />
            } else if ( ["episode"].includes(key) ) {
                return <PropDetail 
                    key={index}
                    propType="list"
                    propName={key}
                    value={value}
                />
            }
        }) 
        return(
            <div className={modalFgClasses}>
                <div className={modalClasses}>
                    <ActionBar position="top"
                        items={[
                            { item: <span>{data?.name}</span>, position: "center" },
                            { item: !favorites.includes(data?.id) ? 
                                <button onClick={() => addToFavorites(data?.id)}>⭐ Add</button> :
                                <button onClick={() => removeFromFavorites(data?.id)}>⭐ Remove</button>, position: "right"},
                            { item: <button onClick={() => closeModal()}>❌ Close</button>, position: "right"}
                        ]}
                    />
                    <Loader show={isLoading} />
                    <div className="modal-content">
                        <div 
                            className="hero-container"
                        >   <div className="hero"
                                style={{
                                    backgroundImage: data?.image ? "url("+data?.image+")" : ""
                                }}
                            >
                            &nbsp;
                            </div>
                        </div>
                        <div className="modal-content-details">
                            {details}
                        </div>
                    </div>
                    {/* TODO: Add navigation through elements */}
                    {/* <ActionBar position="bottom"
                        items={[
                            { item: <button disabled={!data.next} onClick={() => this.openNextDetails(data)}>Next</button>, position: "right"},
                            { item: <button disabled={!data.previous} onClick={() => this.openPreviousDetails(data)}>Previous</button>, position: "left"}
                        ]}
                    /> */}
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
        return { data: character, isLoading }
    }
    return { character: null, isLoading: character?.loading || isLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getCharacter}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);