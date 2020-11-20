const path = require("path")
const fs = require("fs")

const BaseManager = require("./BaseManager")

const Command = require("./../structures/Command")

const CommandExecutionData = require("./../data/CommandExecutionData")

class CommandManager extends BaseManager
{
    get count()
    {
        return Object.keys(this.cache).length
    }

    constructor()
    {
        super()
    }

    set(identifier, instance)
    {
        if (!(instance instanceof Command))
            return

        instance.name = identifier
        instance.parent = this

        this.cache[identifier] = instance

        return instance
    }

    add(identifier, ...options)
    {
        return this.set(identifier, new Command(identifier, ...options))
    }

    push(instance)
    {
        return this.set(instance.name, instance)
    }

    load(directoryPath)
    {
        if (typeof directoryPath !== "string" || directoryPath.length === 0)
            return

        directoryPath = path.resolve(directoryPath)

        if (!fs.existsSync(directoryPath))
            return

        let content = fs.readdirSync(directoryPath)

        for (let elementIndex in content)
        {
            let element = content[elementIndex]
            let elementPath = path.join(directoryPath, element)

            if (fs.statSync(elementPath).isDirectory())
                this.load(elementPath)
            else
                this.push(require(elementPath))
        }
    }

    find(commandName)
    {
        if (typeof commandName !== "string")
            return

        return Object.values(this.cache).find(command => command.named(commandName))
    }

    async execute(executionData)
    {
        if (!(executionData instanceof CommandExecutionData))
            return

        let command = this.find(executionData.name)

        if (!command)
            return

        await command.execute(executionData)
    }
}

module.exports = CommandManager