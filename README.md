DreamRider
==========

The simpliest state management tool. No actions, reducers, mutators, promises, sagas, middlewares, etc. Just functions which changes the state.

## Usage

```
$ npm install ztsu/dreamrider
```

### Simple usage

For use DreamRider import `init` from `ztsu/dreamrider` package and use it for initialization of the state:

```javascript
import {init} from "dreamrider";

const {apply, getState, subscribe} = init(0)
```

Function `init` returns a bunch of a functions connected with the state:
- `getState` returns current state synchronuosly
- `subscribe` allows to subscribe for changes and receive the new state immediately after changes
- `apply` intended to change the state

In previous example state has been initialized with with `0`.

How to change the state. There are a couple of methods. ...

Suppose there is a function changes the state. The function get current state and return new state.

```javascript
const inc = ({state}) => ({state: state + 1})
```

To change concrete state just apply the function to state with `apply`.

```javascript
apply(inc)()
```

Also suppose there is another functions that changes the state too but asynchronously:

```javascript
const incAsync = () => ({apply}) => setTimeout(() => apply(inc), 1000)
```

### Composition

```javascript
const inc2 => ({apply}) => () => apply(inc, inc)
```
Surely you can use apply for composing async functions:

```javascript
const inc2Async = ({apply}) => () => apply(incAsync, incAsync)
```

There is a shorthand method `and` with the same purpose:

```javascript
const inc2 = ({and}) => and(inc, inc)
```

There is `applyFor` (and shorthand `or`) for conditional composition:

```javascript
const tryInc = ({applyOr}) => () => applyOr(incIfNot50, inc2)
```
### Usage with React

```javascript
import React from "react"
import ReactDOM from "react-dom"
import {init} from "ztsu/dreamrider"
import {connect} from "ztsu/dreamrider/react"

const App = (apply) {
	return ({state}) => (
		<>
			<button onClick={apply(dec)}>-</button>
			<span>{state}</span>
			<button onClick={apply(inc)}>+</button>
		</>
	)
}

const {apply, subscribe, getState} = init(0)

ReactDOM.render(
	React.createElement(connect({subscribe, state: getState})(App(apply))),
	document.getElementById("root")
)
```

## Why DreamRider?

DreamRider isn't a framework for state management tools. DreamRider has a simpliest conception and API.

## Examples

- [Counter](../../tree/master/examples/counter/)

## License

MIT.
