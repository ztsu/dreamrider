import { init, Fn, Result } from "../../../src/state"

type State = number

const inc: Fn<State> = ({state}): Result<State> => ({state: state + 1})

const dec: Fn<State> = ({state}): Result<State> => ({state: state + 1})

const {apply, subscribe} = init(0 as State)

subscribe((state: State) => console.log(state))

apply(inc)()