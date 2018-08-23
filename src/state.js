function and(update, state, react) {
	return (...actions) => {
		if (actions.length > 0) {
			const action = actions.shift()

			if (typeof action !== "function") {
				throw new TypeError(action + " is not a function")
			}

			const apply = (fn, ...args) => {
				if (args.length + actions.length > 0) {
					fn(update, state, react)(...args, ...actions)
				}
			}

			let result = action({state: state()})

			if (typeof result == "function") {
				result({apply: (fn) => apply(and, fn)})
				return
			}

			if (result instanceof Error === true) {
				return
			}

			update(result)
			react(state())

			if (actions.length > 0) {
				return and(update, state, react)(...actions)
			}
		}
	}
}

function init(value) {
	let state = value
	const subscribers = []

	return {
		apply: (fn) => and(newState => state = newState, () => state, state => subscribers.forEach(fn => fn(state)), {})(fn),
		subscribe: f => subscribers.push(f),
		getState: () => state
	}
}

export {
	and,
	init
}
