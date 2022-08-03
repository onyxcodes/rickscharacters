import React, { Component } from "react";

import ActionBar from "../components/ActionBar";
import SearchBar from "../components/SearchBar";
import ListView from "../views/ListView";
import Modal from "../views/Modal";
import Toggle from "../components/Toggle";

import FavoritesMgt from "../features/favoritesMgt";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            focusedElement: null,
            favoritesMgt: new FavoritesMgt(),
            searchQuery: null,
            favorites: null,
            favoritesVisible: false
        }
    }

    openDetails( element ) {
        this.setState({
            showModal: true,
            focusedElement: element
        })
    }

    showFavorites( value ) {
        this.setState({ favoritesVisible: value }, () => {
            let favorites;
            if (this.state.favoritesVisible) favorites = this.state.favoritesMgt.getFavorites();
            this.setState({ 
                searchQuery: null,
                favorites: this.state.favoritesVisible ? favorites : null
            })
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    setSearchQuery(name) {
        this.setState({ searchQuery: name })
    }

    addToFavorites(elementId) {
        let favorites = this.state.favoritesMgt.addToFavorites(elementId);
        this.setState({ favoritesMgt: new FavoritesMgt(favorites) })
    }

    removeFromFavorites(elementId) {
        let favorites = this.state.favoritesMgt.removeFromFavorites(elementId);
        this.setState({ favoritesMgt: new FavoritesMgt(favorites) })
    }

    render() {
        return (
            <div id="app">
                <ActionBar 
                    position="top"
                    bgColor="teal"
                    items={[
                        { item: <SearchBar value={this.state.searchQuery} disabled={this.state.favoritesVisible} setSearchQuery={(name)=> this.setSearchQuery(name)} />, position: "left" },
                        { item: <span>Rick's Characters</span>, position: "center" },
                        { item: <Toggle id="favorites" 
                            onChange={ (value) => this.showFavorites(value)} 
                            checked={this.state.favoritesVisible}
                            label="⭐ Favorites"/>, position: "right"
                        }
                    ]} 
                />
                <ListView
                    query={this.state.searchQuery}
                    idFilter={this.state.favorites}
                    paginated={false}
                    size="medium"
                    openDetails={(el) => this.openDetails(el)}
                />
                { this.state.showModal ? <Modal
                    visible={this.state.showModal}
                    closeModal={() => this.closeModal()}
                    changeContent={(element) => this.openDetails(element)}
                    favorites={this.state.favoritesMgt.getFavorites()}
                    addToFavorites={(elId) => this.addToFavorites(elId)}
                    removeFromFavorites={(elId) => this.removeFromFavorites(elId)}
                    data={this.state.focusedElement}
                    // id={this.state.focusedElement?.id}
                    size="medium"
                /> : null }
            </div>
        )
    }
}

export default App;