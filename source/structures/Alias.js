const valueKey = Symbol()

class Alias
{
    get value()
    {
        return this[valueKey] || ""
    }

    set value(newValue)
    {
        if (typeof newValue !== "string")
            return

        this[valueKey] = newValue
    }

    constructor(value)
    {
        this.value = value
    }
}

module.exports = Alias