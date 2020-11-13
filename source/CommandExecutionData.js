class CommandExecutionData
{
    constructor(prefix, name, cmd, args, additions)
    {
        this.prefix = prefix
        this.name = name
        this.cmd = cmd
        this.args = args
        this.additions = additions
    }
}

module.exports = CommandExecutionData