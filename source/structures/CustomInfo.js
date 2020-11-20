const nameKey = Symbol()

class CustomInfo
{
    get name()
    {
        return this[nameKey] || ""
    }

    set name(newName)
    {
        if (typeof newName !== "string")
            return

        this[nameKey] = newName
    }

    constructor(name, value)
    {
        this.name = name
        this.value = value
    }
}

module.exports = CustomInfo