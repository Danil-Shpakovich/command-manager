const cmd = require("../../../source/index")

const sub = new cmd.Command("sub", [ "sb" ], executionData => {
    if (executionData.args.length === 0)
        return false
})

sub.callback = function(executionData)
{
    let sub = executionData.args.shift()

    executionData.args.forEach(argument => sub -= Number(argument))

    console.log(sub)
}

module.exports = sub