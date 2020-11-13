const util = require("util")
const path = require("path")
const fs = require("fs")

const Command = require("./Command")
const CommandExecutionData = require("./CommandExecutionData")
const CommandExecutionError = require("./CommandExecutionError")

class CommandManager
{
    prefixes = [ ]
    commands = [ ]
    checks = [ ]
    additions = { }

    constructor()
    {

    }

    addPrefix(prefix)
    {
        if (typeof prefix !== "string" || prefix.length === 0)
            return

        this.prefixes.push(prefix)
        this.prefixes.sort((prefix1, prefix2) => prefix2.length - prefix1.length)
    }

    addPrefixes(prefixes)
    {
        if (!Array.isArray(prefixes))
            return

        prefixes.forEach(prefix => {
            if (typeof prefix === "string" && prefix.length !== 0)
                this.prefixes.push(prefix)
        })
    }

    removePrefix(prefix)
    {
        if (typeof prefix !== "string" || prefix.length === 0)
            return

        let index = this.prefixes.indexOf(prefix)

        if (index === -1)
            return

        this.prefixes.splice(index, 1)
    }

    addCommand(command)
    {
        if (!(command instanceof Command))
            return

        command.parent = this

        this.commands.push(command)
    }

    loadCommands(directoryPath)
    {
        if (typeof directoryPath !== "string" || directoryPath.length === 0)
            return

        directoryPath = path.resolve(directoryPath)

        if (!fs.existsSync(directoryPath))
            return

        let directoryContent = fs.readdirSync(directoryPath)

        for (let directoryObjectIndex in directoryContent)
        {
            let directoryObjectName = directoryContent[directoryObjectIndex]
            let fullPath = path.join(directoryPath, directoryObjectName)

            if (fs.statSync(fullPath).isDirectory())
                this.loadCommands(fullPath)
            else
                this.addCommand(require(fullPath))
        }
    }

    removeCommand(commandName)
    {
        if (typeof commandName !== "string" || commandName.length === 0)
            return

        let commands = this.commands
        let commandIndex = 0

        for (; commandIndex < commands.length; commandIndex++)
            if (commands[commandIndex].checkName(commandName))
                break

        if (commandIndex === commands.length)
            return

        this.commands.splice(commandIndex, 1)
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

    setAddition(key, value)
    {
        this.additions[key] = value
    }

    setAdditions(additions)
    {
        for (let additionKey in additions)
            if (additions.hasOwnProperty(additionKey))
                this.additions[additionKey] = additions[additionKey]
    }

    async executeCommand(executionData)
    {
        let commandName = executionData.name

        if (typeof commandName !== "string" || !(executionData instanceof CommandExecutionData))
            return

        let command = this.commands.find(command => command.checkName(commandName))

        if (!command)
            throw new CommandExecutionError("Not found any of existent commands.")

        let checks = this.checks

        for (let checkIndex in checks) {
            let check = checks[checkIndex]

            let checkResult = util.types.isAsyncFunction(check) ? await check(command, executionData) : check(command, executionData)

            if (checkResult === false)
                return
        }

        await command.execute(executionData)
    }

    async execute(message, additions)
    {
        let prefix = this.prefixes.find(prefix => message.startsWith(prefix))

        if (!prefix)
            throw new CommandExecutionError("Not found any of existent prefixes.")

        let cmd = message.substring(prefix.length)
        let args = cmd.split(/\s+/gm)

        let commandName = args.shift()
        let executionData = new CommandExecutionData(prefix, commandName, cmd, args, { ...this.additions, ...additions })

        await this.executeCommand(executionData)
    }

    canExecute(message)
    {
        let prefix = this.prefixes.find(prefix => message.startsWith(prefix))

        if (!prefix)
            return false

        let cmd = message.substring(prefix.length)
        let args = cmd.split(/\s+/gm)
        let commandName = args.shift()

        let command = this.commands.find(command => command.checkName(commandName))

        return !!command
    }
}

module.exports = CommandManager