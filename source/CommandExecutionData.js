class CommandExecutionData
{
    constructor(prefix, cmd, args, additions)
    {
        this.cmd = cmd
        this.prefix = prefix
        this.args = args
        this.additions = additions
    }
}

module.exports = CommandExecutionData