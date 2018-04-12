// src/components/List/index.jsx

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'

import { fetchList } from '../../actions'
import './style.css'

class List extends Component {
    componentWillMount() {
        this.props.fetchList()
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            {this.props.list.map(item => {
                                return (
                                    <div className="card" key={item.id}>
                                        <div className="card-content">
                                            <p>
                                                <a href={"/" + item.id} target="_blank" className="has-text-primary short-url">{item.id}</a>
                                                <span className="is-pulled-right is-size-7">
                                                    <TimeAgo date={item.creationDate} />
                                                </span>
                                            </p>
                                            <p>
                                                <a href={item.url} className="is-small has-text-grey is-size-7 has-text-weight-semibold source-url">{item.url}</a>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    list: state.list
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
