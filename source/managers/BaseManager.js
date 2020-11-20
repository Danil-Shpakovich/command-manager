class BaseManager
{
    constructor(cacheType = Object)
    {
        this.cache = new cacheType()
    }

    get(identifier, fallback)
    {
        return this.cache[identifier] || fallback
    }
}

module.exports = BaseManager