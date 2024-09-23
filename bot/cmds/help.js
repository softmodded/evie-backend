module.exports.execute = async (client, message, args) => {
    if (!args.length) {
        const commands = client.commands.map(cmd => cmd.help.name).join(', ');
        return message.channel.send(`command list: ${commands}`);
    }

    const command = args[0];
    const cmd = client.commands.get(command);
    if (!cmd) return message.channel.send(`command not found: ${command}`);

    message.channel.send(`command: ${cmd.help.name}\ndescription: ${cmd.help.description}\nusage: ${cmd.help.usage}`);
}

module.exports.help = {
    name: 'help',
    description: 'help command',
    usage: '<command>'
}