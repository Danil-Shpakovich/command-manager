const util = require("util")

const callbackKey = Symbol()

const emptyCallback = () => { }

class Check
{
    get callback()
    {
        return this[callbackKey] || emptyCallback
    }

    set callback(newCallback)
    {
        if (typeof newCallback !== "function")
            return

        this[callbackKey] = newCallback
    }

    constructor(callback)
    {
        this.callback = callback
    }

    async run(...options)
    {
        let callback = this.callback

        return (util.types.isAsyncFunction(callback) ? await callback(...options) : callback(...options)) !== false
    }
}

module.exports = Check