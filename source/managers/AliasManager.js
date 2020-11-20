const BaseManager = require("./BaseManager")

const Alias = require("./../structures/Alias")

class AliasManager extends BaseManager
{
    get count()
    {
        return this.cache.length
    }

    constructor()
    {
        super(Array)
    }

    set(index, instance)
    {
        if (!(instance instanceof Alias))
            return

        this.cache[index] = instance
    }

    push(instance)
    {
        if (!(instance instanceof Alias))
            return

        this.cache.push(instance)

        return instance
    }

    add(...options)
    {
        return this.push(new Alias(...options))
    }

    has(name)
    {
        return !!this.cache.find(alias => alias.value === name)
    }
}

module.exports = AliasManager