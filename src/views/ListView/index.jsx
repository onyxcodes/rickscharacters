import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { listPokemon } from "../../features/pokeapi/list";

import Loader from "../../components/Loader";
import Card from "../../components/Card";
import ActionBar from "../../components/ActionBar";

// TODO: component that accept different size configurations
// and displays a card for each data.entries passed to this
// support pagination and items per page conf
class ListView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // at first load data
        this.props.listPokemon();
    }

    fetchNext() {
        if ( this.props.list && this.props.list?.next ) {
            this.props.listPokemon(
                this.props.list.next.offset,
                this.props.list.next.limit
            )
        } // else throw Error
    }

    fetchPrevious() {
        if ( this.props.list && this.props.list?.previous ) {
            this.props.listPokemon(
                this.props.list.previous.offset,
                this.props.list.previous.limit
            )
        } // else throw Error
    }

    render() {
        const { list, openDetails, isLoading } = this.props;
        return(
            <div className="listView">
                <Loader show={isLoading} />
                {list?.results?.map( (i, index) => {
                    // TODO: consider saving results in current page into an array
                    // therefore it can be used to fetch next and previous from modals
                    // obviously dont compute it here..
                    return <Card key={i.name}
                        openDetails={(data) => openDetails(data)}
                        next={ list.results?.[index+1]?.name }
                        previous={ list.results?.[index-1]?.name }
                        title={i.name}
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
    if (list && list?.count) {
        isLoading = false; 
        return { list, isLoading }
    }
    return { list: [], isLoading: list?.loading || isLoading }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listPokemon}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListView);