import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { listCharacters } from "../../features/rickandmortyapi/list";

import Loader from "../../components/Loader";
import Card from "../../components/Card";
import ActionBar from "../../components/ActionBar";

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: null,
            idFilter: null
        }
    }

    componentDidMount() {
        // at first load data
        this.props.listCharacters();
    }

    componentDidUpdate() {
        // When component recieves a search query, stores in state and fetch character with query
        if (this.props.query !== this.state.query) this.setState({ query: this.props.query}, () => {
            this.props.listCharacters(null, this.state.query, this.state.idFilter);
        });
        if (this.props.idFilter !== this.state.idFilter) this.setState( { idFilter: this.props.idFilter}, () => {
            this.props.listCharacters(null, this.state.query, this.state.idFilter);
        })
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
        const { list, openDetails, loading, error } = this.props;
        return(
            <div className="listView">
                <Loader show={loading} />
                { !error ? list?.results?.map( (i, index) => {
                    return <Card key={i.id}
                        openDetails={(data) => openDetails(data)}
                        data={i}
                        size={this.props.size}
                    />
                }) : <h5>{error}</h5>}
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
    let loading = true,
        error = false; // this when the compoenent is first mounted
    if (list && !list.loading) {
        loading = list.loading,
            error = list.error; 
        return { list, loading, error }
    }
    return { list: [], loading: list?.loading || loading, error }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({listCharacters}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListView);