'use strict'

const { h, Component, Color } = require('ink')
const PropTypes = require('prop-types')

class UI extends Component {
	constructor () {
		super()

		this.state = {
			i: 0
		}
	}

	render () {
		return <Color green>{this.state.i} tests passed</Color>
	}

	componentDidMount () {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			})
		}, 100)
	}

	componentWillUnmount () {
		clearInterval(this.timer)
	}
}

UI.propTypes = {
	name: PropTypes.string
}

UI.defaultProps = {
	name: 'Ink'
}

module.exports = UI
