class CommandExecutionError extends Error
{
    constructor(message)
    {
        super(message)

        this.name = "CommandExecuteError"
    }
}

module.exports = { CommandExecutionError }