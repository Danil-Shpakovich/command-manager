const util = require("util")

const { CommandExecutionData } = require("./CommandExecutionData")

class Command
{
    name = ""
    aliases = [ ]
    checks = [ ]

    execution

    constructor(name, aliases, ...checks)
    {
        if (typeof name !== "string" || name.length === 0)
            return

        if (!Array.isArray(aliases))
            aliases = [ ]

        this.name = name

        aliases.forEach(alias => {
            if (typeof alias === "string" && alias.length !== 0)
                this.aliases.push(alias)
        })

        aliases.forEach(check => {
            if (typeof check === "function")
                this.checks.push(check)
        })
    }

    setName(name)
    {
        if (typeof name !== "string" || name.length === 0)
            return

        this.name = name
    }

    addAlias(alias)
    {
        if (typeof alias !== "string" || alias.length === 0)
            return

        this.aliases.push(alias)
    }

    removeAlias(alias)
    {
        if (typeof alias !== "string" || alias.length === 0)
            return

        let aliasIndex = this.aliases.indexOf(alias)

        if (aliasIndex === -1)
            return

        this.aliases.splice(aliasIndex, 1)
    }

    addCheck(check)
    {
        if (typeof check !== "function")
            return

        return this.checks.push(check) - 1
    }

    removeCheck(checkIndex)
    {
        if (typeof checkIndex !== "number")
            return

        this.checks.splice(checkIndex, 1)
    }

    setExecution(execution)
    {
        if (typeof execution !== "function")
            return

        this.execution = execution
    }

    checkName(commandName)
    {
        return this.name === commandName || this.aliases.includes(commandName)
    }

    async execute(executionData)
    {
        if (!(executionData instanceof CommandExecutionData))
            return

        if (typeof this.execution !== "function")
            return

        let checks = this.checks

        for (let checkIndex in checks) {
            let check = checks[checkIndex]

            let checkResult = util.types.isAsyncFunction(check) ? await check(executionData) : check(executionData)

            if (checkResult === false)
                return
        }

        this.execution(executionData)
    }
}

module.exports = { Command }