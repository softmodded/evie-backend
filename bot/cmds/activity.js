const { ActivityType } = require("discord.js");

module.exports.execute = async (client, message, args) => {
    const activity = args.join(' ');
    if (!activity) return message.channel.send('no activity provided');

    await client.db.set('activity', activity);
    client.user.setActivity({
        type: ActivityType.Custom,
        name: activity
    });
    return message.channel.send(`set activity to: ${activity}`);
}

module.exports.help = {
    name: 'activity',
    description: 'set bot activity',
    usage: '<activity>'
}