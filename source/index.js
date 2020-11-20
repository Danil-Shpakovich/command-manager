module.exports = {
    Shell : require("./Shell"),

    // Data
    CommandExecutionData : require("./data/CommandExecutionData"),

    // Managers
    AdditionManager : require("./managers/AdditionManager"),
    AliasManager : require("./managers/AliasManager"),
    CheckManager : require("./managers/CheckManager"),
    CommandManager : require("./managers/CommandManager"),
    CustomInfoManager : require("./managers/CustomInfoManager"),
    PrefixManager : require("./managers/PrefixManager"),

    // Structures
    Addition : require("./structures/Addition"),
    Alias : require("./structures/Alias"),
    Check : require("./structures/Check"),
    Command : require("./structures/Command"),
    CustomInfo : require("./structures/CustomInfo"),
    Prefix : require("./structures/Prefix"),
}