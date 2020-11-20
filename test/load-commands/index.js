const cmd = require("../../source/index")

const shell = new cmd.Shell()

shell.prefixes.add("!")
shell.prefixes.add("$")
shell.commands.load("commands")

let execution = async () => {
    await shell.execute("!sub 316 2 -5.36 10 14 1.25")
    await shell.execute("$sum 29 13.51 52 -24 27")
    await shell.execute("!test")
}

execution()