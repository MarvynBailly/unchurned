// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { globalPrefix, token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Online');

	// display activity
	client.user.setActivity('Unturned');
});

// Slash commands:
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Prefix commands
client.on('messageCreate', async message => {
	// console.log('Message registered:', message);

	// react to messages
	message.react('<:zambie:347968283905097729>');

	if (message.author.bot) return;

	let args;
	// handle messages in a guild
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(globalPrefix)) {
			prefix = globalPrefix;
		}

		// if we found a prefix, setup args; otherwise, this isn't a command
		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	}
	else {
		// handle DMs
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

	// get the first space-delimited argument after the prefix as the command
	const command = args.shift().toLowerCase();

	// Implement a file system for commands


	// PREFIX COMMANDS
	switch (command) {
		// test command
		case 'test':
			return message.channel.send('recieved!');
	}

});


// Presence
client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (!newPresence.activities) return false;

	//	filter for playing game
	const presence = newPresence.activities.filter(x => x.type === 'PLAYING');

	// is null when ending the game
	if (presence[0] == null) return false;

	// console.log(presence[0].name);


	// send message in General saying the user is playing
	if (presence[0].name === 'Unturned') {
		client.channels.cache.get('428434692992401409').send(`Looks like ${newPresence.user.tag} is churning! <:zambie:347968283905097729> <:zambie:347968283905097729>`);
	}
});

// Login to Discord with your client's token
client.login(token);