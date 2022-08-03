import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: null,
            searchBtnDisabled: true
        }
    }
    searchTimeout;

    prepareSearch(e) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
        this.setState( state => { return {
            searchBtnDisabled: e.target?.value == state.searchQuery ? true : false
        }});
        if (e.target?.value !== this.state.searchQuery) this.searchTimeout = setTimeout( () => {
            this.setState({
                searchQuery: e.target.value
            })
            this.performSearch()
        },1500);
    }
    
    performSearch() {
        this.props.setSearchQuery(this.state.searchQuery);
        this.setState({
            searchBtnDisabled: true
        });
    }
    render() {
        return(
            <>
                <input type="text" disabled={this.props.disabled} placeholder="Search by name"
                    onChange={ (e) => this.prepareSearch(e)}
                />
                <button onClick={ () => this.performSearch()} disabled={this.state.searchBtnDisabled}>🔍 Search</button>
            </>
        )
    }
}

export default SearchBar;