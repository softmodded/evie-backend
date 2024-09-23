const fetch = require('node-fetch');

module.exports.execute = async (client, message, args) => {
    const service = args[0];

    if (!service) {
        const services = await client.db.get('services');
        const serviceNames = Object.keys(services).join(', ');
        return message.channel.send(`service list: ${serviceNames}`);
    }

    const services = await client.db.get('services');
    const url = services[service];

    if (!url) return message.channel.send('service not found');

    try {
        const response = await fetch(url);
        if (response.ok) return message.channel.send('service is up');
    } catch (err) {
        return message.channel.send('service is down');
    }
}

module.exports.help = {
    name: 'status',
    description: 'check status of services',
    usage: '<service>'
}