const BaseManager = require("./BaseManager")

const Check = require("./../structures/Check")

class CheckManager extends BaseManager
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
        if (!(instance instanceof Check))
            return

        this.cache[index] = instance
    }

    push(instance)
    {
        if (!(instance instanceof Check))
            return

        this.cache.push(instance)

        return instance
    }

    add(...options)
    {
        return this.push(new Check(...options))
    }

    async run(...options)
    {
        let checks = this.cache

        for (let checkIndex = 0; checkIndex < checks.length; checkIndex++)
        {
            let check = checks[checkIndex]

            if (!(await check.run(...options)))
                return false
        }

        return true
    }
}

module.exports = CheckManager