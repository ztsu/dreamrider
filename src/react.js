import React from "react"

export function connect({subscribe, state}) {
	return function(Component) {
		return class extends React.Component {
			constructor(props) {
				super(props)
				this.state = state()
			}

			render() {
				return React.createElement(Component, {...this.props, state: this.state})
			}

			componentDidMount() {
				subscribe(state => this.setState(state))
			}
		}
	}
}