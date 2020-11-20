const CommandExecutionData = require("./../source/data/CommandExecutionData")

const AdditionManager = require("./managers/AdditionManager")
const CheckManager = require("./managers/CheckManager")
const CommandManager = require("./managers/CommandManager")
const PrefixManager = require("./managers/PrefixManager")

class Shell
{
    prefixes = new PrefixManager()
    commands = new CommandManager()
    checks = new CheckManager()
    additions = new AdditionManager()

    constructor()
    {

    }

    async execute(cmd, additions)
    {
        let prefix = this.prefixes.starts(cmd)

        if (!prefix)
            return

        cmd = cmd.substring(prefix.value.length)

        let args = cmd.split(/\s+/gm)

        let commandName = args.shift()
        let executionData = new CommandExecutionData(prefix, commandName, cmd, args, this.additions.merge(additions))

        await this.commands.execute(executionData)
    }
}

module.exports = Shell