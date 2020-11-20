const cmd = require("../../../source/index")

const sum = new cmd.Command("sum", [ "sm" ], executionData => {
    if (executionData.args.length === 0)
        return false
})

sum.callback = function(executionData)
{
    let sum = 0

    executionData.args.forEach(argument => sum += Number(argument))

    console.log(sum)
}

module.exports = sum