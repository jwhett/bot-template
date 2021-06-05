// Discord setup
const Discord = require('discord.js');
const client = new Discord.Client();

// Our environment vars
const token = process.env.token;
const appID = process.env.appID;
const perms = process.env.perms;
const prefix = process.env.prefix;
const invLink = `https://discord.com/oauth2/authorize?client_id=${appID}&scope=bot&permissions=${perms}`;

// Other
const onlineMessage = 'with bots';
const idleMessage = 'with jellyfish';


// Events
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}! Invite link: ${invLink}`);
	client.user.setPresence({ activity: { name: onlineMessage }, status: 'online' });
});

client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.startsWith(prefix)) handleCommands(message);
});

client.login(token);


// Functions
function handleCommands(message) {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
	case 'enable':
		enable();
		break;
	case 'disable':
		disable();
		break;
	case 'status':
		status(message);
		break;
	}
}

function disable() {
	if (disabled) return;
	disabled = true;
	client.user.setPresence({ activity: { name: idleMessage }, status: 'idle' });
	console.log('bot disabled');
}

function enable() {
	if (!disabled) return;
	disabled = false;
	client.user.setPresence({ activity: { name: onlineMessage }, status: 'online' });
	console.log('bot enabled');
}

function status(message) {
	message.channel.send(`Online - disabled? ${disabled}`);
}
