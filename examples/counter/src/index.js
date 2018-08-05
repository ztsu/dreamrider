import React from "react";
import ReactDOM from "react-dom";
import {init} from "../../../src/state";
import {connect} from "../../../src/react";

const inc = ({state}) => ({...state, counter: state.counter + 1})

const inc2 = ({and}) => and(inc, inc)

const dec = ({state}) => ({...state, counter: state.counter - 1})

const incAsync = ({apply}) => () => setTimeout(() => apply(inc), 1000)

const inc2Async = ({apply}) => () => apply(incAsync, incAsync)

const decAsync = ({apply}) => () => setTimeout(() => apply(dec), 1000)

const startLoading = ({state}) => ({...state, loading: state.loading + 1})

const stopLoading = ({state}) => ({...state, loading: state.loading - 1})

const processInc = ({apply}) => () => apply(startLoading, incAsync, stopLoading)

const processDec = ({apply}) => () => apply(startLoading, decAsync, stopLoading)

// view

const Loading = ({value}) => <span>Loading: {value}</span>

function App(apply) {
	return ({state: {loading, counter}}) => (
		<div>
			<Loading value={loading}/>
			<button onClick={apply(processDec)}>...(-)</button>
			<button onClick={apply(dec)}>-</button>
			<span>{counter}</span>
			<button onClick={apply(inc)}>+</button>
			<button onClick={apply(inc2)}>++</button>
			<button onClick={apply(processInc)}>...(+)</button>
		</div>
	)
}

// initialization

const {apply, subscribe, getState} = init({counter: 42, loading: 0})

ReactDOM.render(
	React.createElement(
		connect({subscribe, state: getState})(App((...args) => () => apply(...args)))
	),
	document.getElementById("root")
)

subscribe((state) => console.log("State:", state))

const first = ({state, error}) => { console.log("first", state, error); return {...state, counter: state.counter + 1} }
const asyncFirst = () => ({apply}) => {setTimeout(() => apply(first), 1000)}
const second = ({state, error}) => { console.log("second", state, error); return {...state, counter: state.counter + 1} }
const asyncSecond = () => ({apply}) => {setTimeout(() => apply(second), 1000)}
const third = ({state, error}) => { console.log("third", state, error); return {...state, counter: state.counter + 1} }
const fourth = ({state, error}) => { console.log("fourth", state, error); return {...state, counter: state.counter + 1} }
const fail = ({state, error}) => { console.log("fail", state, error); return new Error("Fail!") }
const delayedFail = () => ({apply}) => { setTimeout(() => apply(fail), 1000) }
const recover = ({state, error}) => { console.error("recover", state, error); return state }
const delayedWait = () => ({apply})=> { setTimeout(() => apply(wait), 1000) }
const wait = ({state}) => { console.log("wait"); return state }

const test3 = () => ({apply}) => apply(first, second)

const test10 = ({and}) => and(first, second, third)
const test11 = ({and}) => and(asyncFirst, second, third)
const test12 = ({and}) => and(first, asyncSecond)
const test13 = ({and}) => and(asyncFirst, asyncSecond, third)
const test14 = ({and}) => and(first, fail, recover)
const test15 = ({and}) => and(fail, second)
const test16 = ({and}) => and(fail)
const test17 = ({and}) => and(first, fail)

const test20 = ({or}) => or(first, second, third)
const test21 = ({or}) => or(fail, recover)
const test22 = ({or}) => or(fail, fail)

const test30 = ({and}) => and(test1, test1)
const test31 = ({and}) => and(test2, test2)
const test32 = ({and}) => and(test10, test10)

const test40 = ({or}) => or(test17, recover)

apply(test20)