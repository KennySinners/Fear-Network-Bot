import { Message, Client, MessageEmbed } from "discord.js";
import { IBot } from "../../api";
import { cmds } from "../../$stuff/functions/loaders";

export default class help implements IBot {

      private readonly _command = "help";

      help(): string { 
            return "Displays the help embed";
      }

      isThisCommand(command: string): boolean { 
            return command === this._command;
      }

      usage(): string { 
            return "!help";
      }

      admin_only(): boolean { 
            return false;
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const helpEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(`${client.user.username}'s commands and their descriptions`)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp();

            for (let i = 0; i < cmds.commands.length; i++) { 
                  helpEmbed.addField(
                        cmds.commands[i]._command.split("")[0].toUpperCase() + cmds.commands[i]._command.slice(1),
                        cmds.commands[i].help() + ` | Usage: \`\`${cmds.commands[i].usage()}\`\` (Admin only? ${cmds.commands[i].admin_only() === false ? "No" : "Yes"}) `
                  );
            };

            message.channel.send(helpEmbed);
            
      }
}