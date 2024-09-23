module.exports.execute = async (client, message, args) => {
    message.channel.send(`ping: ${client.ws.ping}ms\nuptime: ${client.uptime}ms`);
}

module.exports.help = {
    name: 'ping',
    description: 'ping the bot',
    usage: ''
}