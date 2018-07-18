export function and(update, state, react, {error}) {
	return (...actions) => {
		if (actions.length > 0) {
			const action = actions.shift()
			let result = {}

			const apply = (...args) => {
				if (args.length + actions.length > 0) {
					and(update, state, react, {error})(...args, ...actions)
				}
			}

			if (typeof action == "function") {
				result = action({
					state: state(),
					apply,
					and: (...args) => () => apply(...args),
					error
				})

				if (typeof result == "function") {
					result()
					return
				}

				update(result.state)
				react(state())
			}

			if (actions.length > 0) {
				and(update, state, react, {error: result.error})(...actions)
			}
		}
	}
}

export function or(update, state, react) {
	return (...actions) => {
		if (actions.length > 0) {
			const action = actions.shift()
			let result = {}

			if (typeof action == "function") {
				result = action({state: state()})

				if (typeof result == "function") {
					result((...args) => {
						if (args.length + actions.length > 0) {
							and(update, state, react, {})(...args, ...actions)
						}
					})
					return
				}

				if (result.error === undefined) {
					update(result.state)
					react(state())

				} else if (actions.length > 0) {
					or(update, state, react, {error: result.error})(...actions)
				}
			}
		}
	}
}

export function init(value) {
	let state = value
	const subscribers = []

	return {
		apply: and(newState => state = newState, () => state, state => subscribers.forEach(fn => fn(state)), {}),
		applyOr: (...actions) => () => or(newState => state = newState, () => state, state => subscribers.forEach(f => f(state)))(...actions),
		subscribe: f => subscribers.push(f),
		getState: () => state
	}
}

export default init;