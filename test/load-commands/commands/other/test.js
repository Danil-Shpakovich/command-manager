const cmd = require("../../../../source/index")

const test = new cmd.Command("test", [ "t", "tst" ])

test.customInfo.set("help", "Prints this text.")

test.callback = function(executionData)
{
    console.log(test.customInfo.get("help").value)
}

module.exports = test