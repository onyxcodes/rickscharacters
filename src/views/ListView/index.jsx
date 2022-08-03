import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { listCharacters } from "../../features/rickandmortyapi/list";

import Loader from "../../components/Loader";
import Card from "../../components/Card";
import ActionBar from "../../components/ActionBar";

// TODO: component that accept different size configurations
// and displays a card for each data.entries passed to this
// support pagination and items per page conf
class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: null
        }
    }

    componentDidMount() {
        // at first load data
        this.props.listCharacters();
    }

    componentDidUpdate() {
        if (this.props.query !== this.state.searchQuery) this.setState({ searchQuery: this.props.query}, () => {
            this.props.listCharacters(null, this.state.searchQuery);
        });
        // debugger;
        // if ( this.props.query !== this.state.searchQuery && this.state.searchQuery ) 
    }

    fetchNext() {
        if ( this.props.list && this.props.list?.next ) {
            this.props.listCharacters(
                this.props.list.next
            )
        } // else throw Error
    }

    fetchPrevious() {
        if ( this.props.list && this.props.list?.previous ) {
            this.props.listCharacters(
                this.props.list.previous
            )
        } // else throw Error
    }

    render() {
        const { list, openDetails, isLoading } = this.props;
        return(
            <div className="listView">
                <Loader show={isLoading} />
                {list?.results?.map( (i, index) => {
                    return <Card key={i.id}
                        openDetails={(data) => openDetails(data)}
                        data={i}
                        size={this.props.size}
                    />
                })}

                <ActionBar position="bottom"
                    items={[
                        { item: <button onClick={() => this.fetchPrevious()} disabled={!list.previous}>Previous</button>, position: "left"},
                        { item: <button onClick={() => this.fetchNext()} disabled={!list.next}>Next</button>, position: "right"}
                    ]}
                />
            </div>
        )
    }
}

function mapStateToProps({list}) {
    let isLoading = true; // this when the compoenent is first mounted
    if (list && list.results?.length) {
        console.log("ListView - list", list)
        isLoading = false; 
        return { list, isLoading }
    }
    return { list: [], isLoading: list?.loading || isLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listCharacters}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListView);