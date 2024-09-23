module.exports.execute = async (client, message, args) => {
    let time = args.shift();
    const reminder = args.join(' ');
    if (!time || !reminder) return message.channel.send('missing time or reminder');

    if (time.endsWith('s')) {
        time = time.slice(0, -1);
    } else if (time.endsWith('m')) {
        time = time.slice(0, -1) * 60;
    } else if (time.endsWith('h')) {
        time = time.slice(0, -1) * 60 * 60;
    } else {
        time = time;
    }

    message.channel.send(`reminder set for ${time} seconds`)

    setTimeout(() => {
        message.channel.send(`<@${message.author.id}> reminder: ${reminder}`);
    }, time * 1000);
}

module.exports.help = {
    name: 'remindme',
    description: 'reminder command',
    usage: '<time> <message>'
}