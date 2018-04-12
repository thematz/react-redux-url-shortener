import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchUrl } from './actions'
import Form from './components/Form'
import List from './components/List'
import Notification from './components/Notification'
import 'bulma/css/bulma.css'

class App extends Component {
	componentWillMount() {
		if (this.props.location.pathname !== '/') {
			this.props.fetchUrl(this.props.location.pathname)
		}
	}
	render() {
		const { notification } = this.props
		return (
			<div className="App">
				<main>
					<Notification type={notification.type} message={notification.message} />
					<Form />
					<List />
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	notification: state.notification
})

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchUrl
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)