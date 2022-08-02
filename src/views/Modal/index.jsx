import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { getPokemon } from "../../features/pokeapi/pokemon";

import ActionBar from "../../components/ActionBar";
import Loader from "../../components/Loader";

class Modal extends Component {
    
    // TODO: on component mount fetch deatils through given id or name
    componentDidMount() {
        this.props.getPokemon(null, this.props.data?.current);
    }

    openNextDetails(data) {
        let nextdata = {
            current: data.next,
            previous: data.current,
            next: null
        }
        this.props.changeContent(nextdata);
        this.props.getPokemon(null, nextdata?.current);
    }

    openPreviousDetails(data) {
        let prevdata = {
            current: data.previous,
            previous: null,
            next: data.current
        }
        this.props.changeContent(prevdata);
        this.props.getPokemon(null, prevdata?.current);
    }

    render() {
        const { size, visible, data, isLoading, pokemon, addToFavorites, closeModal } = this.props;
        var modalClasses = size ? "modal".concat(" "+size) : "modal";
        var modalFgClasses  = visible ? "modal-fg".concat(" "+"visible") : "modal-fg";
        return(
            <div className={modalFgClasses}>
                <div className={modalClasses}>
                    <ActionBar position="top"
                        items={[
                            { item: <span>{data?.current}</span>, position: "center" },
                            { item: <button onClick={() => addToFavorites(data?.current.id)}>Add to favorites</button>, position: "right"},
                            { item: <button onClick={() => closeModal()}>Close</button>, position: "right"}
                        ]}
                    />
                    <Loader show={isLoading} />
                    {/* TODO: Add loader while fetching additional details */}
                    <div className="modal-content">
                        <div 
                            className="modal-content-hero"
                            style={{
                                backgroundImage: pokemon?.sprites.other["official-artwork"].front_default ? "url("+pokemon?.sprites.other["official-artwork"].front_default+")" : ""
                            }}
                        >&nbsp;</div>
                        <div className="modal-content-details">
                            <ul>
                                <li>Types: { pokemon?.types?.map( (el, index) => {
                                    if (index) return ", "+el.type.name;
                                    else return el.type.name;
                                })}</li>
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

function mapStateToProps({pokemon}) {
    let isLoading = true; // this when the compoenent is first mounted
    if (pokemon && pokemon?.id) {
        console.log("Modal - Recieved data", pokemon)
        isLoading = false; 
        return { pokemon, isLoading }
    }
    return { pokemon: null, isLoading: pokemon?.loading || isLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPokemon}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);