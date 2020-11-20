const keyKey = Symbol()

class Addition
{
    get key()
    {
        return this[keyKey] || ""
    }

    set key(newKey)
    {
        if (typeof newKey !== "string")
            return

        this[keyKey] = newKey
    }

    constructor(key, value)
    {
        this.key = key
        this.value = value
    }
}

module.exports = Addition