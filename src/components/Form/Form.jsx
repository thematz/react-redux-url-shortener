// src/components/Form/index.jsx

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { shorten, updateUrl } from '../../actions'

class Form extends Component {
    handlePaste = e => {
        const url = e.clipboardData.getData('Text')
        this.props.shorten(url)
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.props.url) {
            this.props.shorten(this.props.url)
        }
    }
    handleValueChange = value => {
        this.props.updateUrl(value)
    }
    render() {
        return (
            <section className="section">
                <form className="container" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="columns">
                        <div className="field has-addons column is-8 is-offset-2">
                            <div className="control is-expanded">
                                <input 
                                    className="input"
                                    type="text" 
                                    placeholder="Past a link to shorten it" 
                                    value={this.props.url} 
                                    onChange={(e) => this.handleValueChange(e.target.value)} 
                                    onPaste={this.handlePaste}
                                />
                            </div>
                            <div className="control">
                                <button className="button is-primary" type="submit">Shorten</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    url: state.url
})
const mapDispatchToProps = dispatch => bindActionCreators({ 
    shorten,
    updateUrl
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)