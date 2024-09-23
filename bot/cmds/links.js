module.exports.execute = async (client, message, args) => {
    const subcommand = args.shift();
    if (!subcommand) return message.channel.send('no subcommand provided');

    if (subcommand === 'add') {
        const name = args.shift();
        const link = args.shift();
        if (!name || !link) return message.channel.send('missing name or link');

        const links = (await client.db.get('links')) || {};
        links[name] = link;
        await client.db.set('links', links);
        return message.channel.send(`added link: ${name} -> ${link}`);
    }

    if (subcommand === 'remove') {
        const name = args.shift();
        if (!name) return message.channel.send('missing name');

        const links = (await client.db.get('links')) || {};
        delete links[name];
        await client.db.set('links', links);
        return message.channel.send(`removed link: ${name}`);
    }

    if (subcommand == "get") {
        const name = args.shift();
        if (!name) return message.channel.send('missing name');

        const links = (await client.db.get('links')) || {};
        const link = links[name];
        if (!link) return message.channel.send('link not found');
        return message.channel.send(`link: ${name} -> ${link}`);
    }

    return message.channel.send('invalid subcommand');
}

module.exports.help = {
    name: 'links',
    description: 'manage links',
    usage: '<add/remove> <name> <link>'
}