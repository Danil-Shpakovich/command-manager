const util = require("util")

const CommandExecutionData = require("./../data/CommandExecutionData")

const AliasManager = require("./../managers/AliasManager")
const CheckManager = require("./../managers/CheckManager")
const CustomInfoManager = require("./../managers/CustomInfoManager")

const Check = require("./Check")

const callbackKey = Symbol()

const emptyCallback = () => { }

class Command
{
    aliases = new AliasManager()
    checks = new CheckManager()
    customInfo = new CustomInfoManager()

    get callback()
    {
        return this[callbackKey]
    }

    set callback(newCallback)
    {
        if (typeof newCallback !== "function")
            return

        this[callbackKey] = newCallback
    }

    constructor(name, aliases, ...checks)
    {
        if (typeof name !== "string")
            name = ""

        if (!Array.isArray(aliases))
            aliases = [ ]

        this.name = name

        aliases.forEach(alias => {
            if (typeof alias === "string")
                this.aliases.add(alias)
        })

        checks.forEach(check => {
            if (check instanceof Check)
                this.checks.push(check)
            else if (typeof check === "function")
                this.checks.add(check)
        })

        this.callback = emptyCallback
    }

    named(name)
    {
        return this.name === name || this.aliases.has(name)
    }

    async execute(executionData)
    {
        if (!(executionData instanceof CommandExecutionData))
            return

        if (!(await this.checks.run(executionData)))
            return

        let callback = this.callback

        if (util.types.isAsyncFunction(callback))
            await this.callback(executionData)
        else
            this.callback(executionData)
    }
}

module.exports = Command