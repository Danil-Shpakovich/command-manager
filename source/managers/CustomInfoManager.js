const BaseManager = require("./BaseManager")

const CustomInfo = require("./../structures/CustomInfo")

class CustomInfoManager extends BaseManager
{
    get count()
    {
        return Object.keys(this.cache).length
    }

    constructor()
    {
        super()
    }

    set(identifier, instance)
    {
        if (!(instance instanceof CustomInfo))
            if (instance !== undefined)
                instance = new CustomInfo(identifier, instance)
            else
                return

        instance.key = identifier

        this.cache[identifier] = instance
    }

    add(identifier, ...options)
    {
        return this.set(identifier, new CustomInfo(identifier, ...options))
    }
}

module.exports = CustomInfoManager