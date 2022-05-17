const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlocks an office'),
	async execute(interaction) {
		let allowedRole = message.guild.roles.cache.find(r => r.name === "Knight");
		console.log(interaction.memberPermissions);
		console.log(interaction.memberPermissions == allowedRole);
	},
};