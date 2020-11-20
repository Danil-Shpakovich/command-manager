const BaseManager = require("./BaseManager")

const Addition = require("./../structures/Addition")

class AdditionManager extends BaseManager
{
    get count()
    {
        return Object.keys(this.cache).length
    }

    constructor(additions)
    {
        super()

        if (typeof additions !== "object")
            return

        for (let key in additions)
            if (additions.hasOwnProperty(key))
                this.add(key, additions[key])
    }

    set(identifier, instance)
    {
        if (!(instance instanceof Addition))
            return

        instance.key = identifier

        this.cache[identifier] = instance
    }

    add(identifier, ...options)
    {
        return this.set(identifier, new Addition(identifier, ...options))
    }

    merge(additions)
    {
        if (additions instanceof AdditionManager)
            additions = additions.cache
        else if (typeof additions !== "object")
            return new AdditionManager(this.cache)

        return new AdditionManager({ ...this.cache, ...additions })
    }
}

module.exports = AdditionManager