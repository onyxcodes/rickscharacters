import React, { Component } from "react";

import ActionBar from "../components/ActionBar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ListView from "../views/ListView";
import Modal from "../views/Modal";

import FavoritesMgt from "../features/favoritesMgt";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            focusedElement: null,
            favoritesMgt: new FavoritesMgt(),
            searchQuery: null
        }
    }

    openDetails( element ) {
        this.setState({
            showModal: true,
            focusedElement: element
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    setSearchQuery(name) {
        console.log("App - got search query", name)
        this.setState({ searchQuery: name})
    }

    addToFavorites(elementId) {
        let favorites = this.state.favoritesMgt.addToFavorites(elementId);
        this.setState({ favoritesMgt: new FavoritesMgt(favorites)})
    }

    removeFromFavorites(elementId) {
        let favorites = this.state.favoritesMgt.removeFromFavorites(elementId);
        this.setState({ favoritesMgt: new FavoritesMgt(favorites)})
    }

    render() {
        return (
            <div id="app">
                <ActionBar 
                    position="top"
                    bgColor="teal"
                    items={[
                        { item: <SearchBar ctrlLoading={(loadingState) => this.ctrlLoading(loadingState)} setSearchQuery={(name)=> this.setSearchQuery(name)} />, position: "left" },
                        { item: <span>Rick's Characters</span>, position: "center" },
                        { item: <button>⭐ Favorites</button>, position: "right" }
                    ]} 
                />
                {/* <Loader show={this.state.isLoading} /> */}
                <ListView
                    query={this.state.searchQuery}
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