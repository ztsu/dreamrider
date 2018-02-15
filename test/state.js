import {init} from "../src/state"

describe("init", () => {
    it("returns set of functions", () => {
        const {apply, applyOr, subscribe, getState} = init()

        expect(apply).toBeInstanceOf(Function)
        expect(applyOr).toBeInstanceOf(Function)
        expect(subscribe).toBeInstanceOf(Function)
        expect(getState).toBeInstanceOf(Function)
    })

    it("passes initial state", () => {
        const {getState} = init("test")

        expect(getState()).toBe("test")
    })
})

describe("apply", () => {
    it("apply mutates a state", () => {
        const {apply, getState} = init("test")
        const itWorks = jest.fn(() => ({state: "it works"}))

        apply(itWorks)()

        expect(itWorks.mock.calls.length).toBe(1)
        expect(getState()).toBe("it works")
    })

    it("apply mutate a state over thunk", () => {
        const {apply, getState} = init("test")
        const itWorks = jest.fn(({apply}) => () => apply(() => ({state: "it works too"})))

        apply(itWorks)()

        expect(getState()).toBe("it works too")
    })
})

describe("applyOr", () => {
    it("should apply to first success (1)", () => {
        const {applyOr, getState} = init("")

        const first = jest.fn(() => {return {state: "first"}})
        const second = jest.fn(() => {return {state: "second"}})

        applyOr(first, second)()

        expect(getState()).toBe("first")
        expect(first.mock.calls.length).toBe(1)
        expect(second.mock.calls.length).toBe(0)
    })

     it("should apply to first success (2)", () => {
        const {applyOr, getState} = init("")

        const first = jest.fn(() => {return {error: new Error("error")}})
        const second = jest.fn(() => {return {state: "second"}})
        const third = jest.fn(() => {return {state: "third"}})

        applyOr(first, second)()

        expect(getState()).toBe("second")
        expect(first.mock.calls.length).toBe(1)
        expect(second.mock.calls.length).toBe(1)
        expect(third.mock.calls.length).toBe(0)
    })

    it("should apply thunk", () => {
        const {applyOr, getState} = init("")

        const first = jest.fn(() => (apply => apply(() => ({state: "first"}))))

        applyOr(first)()

        expect(getState()).toBe("first")
    })
})