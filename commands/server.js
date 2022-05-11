const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Gives details about the server'),
	async execute(interaction) {
        console.log(interaction, interaction.guild.name),
		await interaction.reply('Server name: ${interaction.guild.name} \nTotal members: ${interaction.guild.memberCount} \nCreated at: ${interaction.guild.createdAt}');
	},
};