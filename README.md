Dreamrider
==========

The simpliest state management tool. No actions, reducers, events, mutators, sagas, middlewares, etc. Just functions which changes the state.

## Usage

```
$ npm i dreamrider
```

For use Dreamrider import `init` from `dreamrider` package and use it for initialization of the state:

```javascript
import {init} from "dreamrider";

const {apply, getState, subscribe} = init(0)
```

Function `init` returns a bunch of a functions connected with the state:
- `getState` returns current state synchronuosly
- `subscribe` allows to subscribe for changes and receive the new state immediately after changes
- `apply` intended to change the state

In previous example state has been initialized with with `0`. How to change the state. There are a couple of methods.

First. Suppose there is a function changes the state. The function get current state and return new state. Like this:

```javascript
const inc = ({state}) => ({state: state + 1})
```

To change concrete state just apply the function to state with `apply`.

```javascript
apply(inc)
```

Very simple.

Second method. Also suppose there is another functions that changes the state too but asynchronously:

```javascript
const incAsync = () => ({apply}) => setTimeout(() => apply(inc), 1000)
```

Looks like thunks in Redux.

To change the state in this case use `apply` likewise:

```javascript
apply(incAsync)
```

That is all.

### Usage with React

```javascript
import React from "react"
import ReactDOM from "react-dom"
import {init} from "dreamrider"
import {connect} from "dreamrider/react"

const App = (apply) {
	return ({state}) => (
		<>
			<button onClick={() => apply(dec)}>-</button>
			<span>{state}</span>
			<button onClick={() => apply(inc)}>+</button>
		</>
	)
}

const {apply, subscribe, getState} = init(0)

ReactDOM.render(
	React.createElement(connect({subscribe, state: getState})(App(apply))),
	document.getElementById("root")
)
```
## License

MIT.
