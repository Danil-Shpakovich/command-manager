const AdditionManager = require("./../managers/AdditionManager")

const Prefix = require("./../structures/Prefix")

const prefixKey = Symbol()
const nameKey = Symbol()
const cmdKey = Symbol()
const argsKey = Symbol()
const additionsKey = Symbol()

class CommandExecutionData
{
    get prefix()
    {
        return this[prefixKey]
    }

    get name()
    {
        return this[nameKey]
    }

    get cmd()
    {
        return this[cmdKey]
    }

    get args()
    {
        return this[argsKey]
    }

    get additions()
    {
        return this[additionsKey]
    }

    constructor(prefix, name, cmd, args, additions)
    {
        if (!(prefix instanceof Prefix))
            if (typeof prefix === "string")
                prefix = new Prefix(prefix)
            else
                prefix = new Prefix()

        if (typeof name !== "string")
            prefix = ""

        if (typeof cmd !== "string")
            prefix = ""

        if (!Array.isArray(args))
            args = [ ]

        if (!(additions instanceof AdditionManager))
            if (typeof additions === "object")
                additions = new AdditionManager(additions)
            else
                additions = new AdditionManager()

        this[prefixKey] = prefix
        this[nameKey] = name
        this[cmdKey] = cmd
        this[argsKey] = args
        this[additionsKey] = additions
    }
}

module.exports = CommandExecutionData