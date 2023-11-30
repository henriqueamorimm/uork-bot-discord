const { Client, ActivityType} = require('discord.js'); // Importar biblioteca 
const axios = require('axios');
const apiKey = "UORK_KEY77urNlK6f7G8fGuoj3CwpyYNJb"; // API KEY DA UORK

const client = new Client({ 
    intents: [
        1 << 0,
        1 << 1,
        1 << 9,
        1 << 10,
        1 << 11,
    ]
})


client.once('ready', async () => {
    console.log('Seu bot está on-line.');
    
  
    client.user.setPresence({
      activities: [{ name: `Usando API Uork V1.5`, type: ActivityType.Watching }],
      status: 'ausent',
    });
  
    const commands = [
      {
        name: 'puxar-info',
        description: 'Comando usado para puxar informações através de um e-mail.',
        options: [
            {
              name: 'email',
              description: 'E-mail do usuário que deseja puxar.',
              type: 3,
              required: true
            }
        ]
      }
        ]

    

    const ServerID = '1179578133918257263';

    const server = client.guilds.cache.get(ServerID); //Procurar por servidor.
    if(!server) return console.log('Seu servidor não foi encontrado.');
    try {
        await server.commands.set(commands);
        console.log('Os comandos de barra foram adicionados ao servidor.');
    } catch (error) {
        console.log('Erro ao adicionar comandos: ', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'puxar-info') {
        const email = interaction.options.getString('email');
        try {
          const response = await axios.get(`https://uork.org/search/status/check-account.php?apikey=${apiKey}&id=${email}`);
          const responseData = response.data;
    
          if (responseData.status && responseData.status === '404') {
              await interaction.reply('<:red_x_cross:1178797580130467870> | E-mail não encontrado.');
            } else {
                const responseDataString = JSON.stringify(responseData);

                await interaction.reply(`<a:Verification:1178797582777061458> | ${responseDataString}`);
            }
          } catch (error) {
            console.error('Erro ao realizar a requisição:', error);
            await interaction.reply('<:red_x_cross:1178797580130467870> | Ocorreu um erro ao processar a requisição.');
          }
        }
      });
client.login('TOKEN-DISCORD'); // Token do seu bot discord```