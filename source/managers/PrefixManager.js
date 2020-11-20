const BaseManager = require("./BaseManager")
const Prefix = require("./../structures/Prefix")

class PrefixManager extends BaseManager
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
        if (!(instance instanceof Prefix))
            return

        this.cache[index] = instance
    }

    push(instance)
    {
        if (!(instance instanceof Prefix))
            return

        this.cache.push(instance)

        this.sort()

        return instance
    }

    add(...options)
    {
        return this.push(new Prefix(...options))
    }

    sort()
    {
        this.cache.sort((prefix1, prefix2) => prefix2.value.length - prefix1.value.length)
    }

    starts(cmd)
    {
        return this.cache.find(prefix => cmd.startsWith(prefix.value))
    }
}

module.exports = PrefixManager