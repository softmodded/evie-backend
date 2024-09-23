module.exports.execute = async (client, message, args) => {
    const [action, name, link] = args;
    if (!action || !name) return message.channel.send('no action or name provided');
    if (action !== 'add' && action !== 'remove') return message.channel.send('invalid action, must be add or remove');

    if (action === 'add' && !link) return message.channel.send('no link provided');

    const services = await client.db.get('services') || [];
    if (action === 'add') {
        services.push({ name, link });
        await client.db.set('services', services);
        return message.channel.send(`added service: ${name}`);
    }

    if (action === 'remove') {
        const index = services.findIndex(service => service.name === name);
        if (index === -1) return message.channel.send(`service not found: ${name}`);

        services.splice(index, 1);
        await client.db.set('services', services);
        return message.channel.send(`removed service: ${name}`);
    }
}

module.exports.help = {
    name: 'service',
    description: 'service add or remove',
    usage: '<add/remove> <name> <link>'
}