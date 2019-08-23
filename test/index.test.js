const { init } = require("../");

describe("init", () => {
    it("returns set of functions", () => {
        const {apply, subscribe, getState} = init()

        expect(apply).toBeInstanceOf(Function)
        expect(subscribe).toBeInstanceOf(Function)
        expect(getState).toBeInstanceOf(Function)
    })

    it("passes initial state", () => {
        const {getState} = init("test")

        expect(getState()).toBe("test")
    })
})

describe("apply", () => {
    it("pure function", () => {
        const {apply, getState} = init("test")
        const itWorks = jest.fn(() => "it works")

        apply(itWorks)

        expect(itWorks.mock.calls.length).toBe(1)
        expect(getState()).toBe("it works")
    })

    it ("thunk", () => {
        const {apply, getState} = init("test")
        const itWorks = jest.fn(() => "it works too")
        const itWorksThunk = jest.fn(() => ({apply}) => apply(itWorks))

        apply(itWorksThunk)

        expect(itWorksThunk.mock.calls.length).toBe(1)
        expect(itWorks.mock.calls.length).toBe(1)
        expect(getState()).toBe("it works too")
    })

    it("async function", (done) => {
        expect.assertions(1)
        const {apply, subscribe} = init("test")
        const itWorks = jest.fn(() => "it works")
        const itWorksAsync = jest.fn(() => ({apply}) => setTimeout(() => apply(itWorks), 0))
        const listener = (state) => {
            expect(state).toBe("it works")
            done()
        }
        subscribe(listener)

        apply(itWorksAsync)
    })
})