import React from "react";
import ReactDOM from "react-dom";
import { init } from "dreamrider";
// import {connect} from "../../../src/react.js";


const inc = ({state}) => ({...state, counter: state.counter + 1})

const incAsync = ({apply}) => () => setTimeout(() => apply(inc), 1000)

const inc2 = ({and}) => and(inc, inc)

const dec = ({state}) => ({state: {...state, counter: state.counter - 1}})

const inc2Async = ({apply}) => () => apply(incAsync, incAsync)

const decAsync = ({apply}) => () => setTimeout(() => apply(dec), 1000)

const startLoading = ({state}) => ({...state, loading: state.loading + 1})

const stopLoading = ({state}) => ({...state, loading: state.loading - 1})

const processInc = ({and}) => and(startLoading, incAsync, stopLoading)

const processDec = ({and}) => and(startLoading, decAsync, stopLoading)

// view

const Loading = ({value}) => <span>Loading: {value}</span>

// function App(apply) {
// 	return ({state: {loading, counter}}) => (
// 		<div>
// 			<Loading value={loading}/>
// 			<button onClick={apply(processDec)}>...(-)</button>
// 			<button onClick={apply(dec)}>-</button>
// 			<span>{counter}</span>
// 			<button onClick={apply(inc)}>+</button>
// 			<button onClick={apply(inc2)}>++</button>
// 			<button onClick={apply(processInc)}>...(+)</button>
// 		</div>
// 	)
// }

// initialization

const {apply, subscribe, getState} = init({counter: 42, loading: 0})

subscribe(state => console.log(state))

// ReactDOM.render(
// 	React.createElement(
// 		connect({subscribe, state: getState})(App((...args) => () => apply(...args)))
// 	),

apply(inc)
apply(inc)
apply(inc)
// 	document.getElementById("root")
// )
