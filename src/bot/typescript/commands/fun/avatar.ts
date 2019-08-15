import { Message, Client, MessageEmbed } from "discord.js";
import { IBot } from "../../api";

export default class avatar implements IBot {

      private readonly _command = "avatar";

      help(): string {
            return "Displays the mentioned user's avatar if there is a mention, otherwise, it will default to the message author";
      }

      isThisCommand(command: string): boolean {
            return command === this._command;
      }

      usage(): string {
            return "!avatar {@user/user_id} or message author by default";
      }

      admin_only(): boolean {
            return false;
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const user = (message.mentions.users.first() || await client.users.fetch(args[0])) || message.author;
            const avatarEmbed = new MessageEmbed();

            await avatarEmbed
                  .setTitle(`${client.user.username} avatar showcase`)
                  .setAuthor(`*${user.tag}'s* avatar`)
                  .setImage(user.displayAvatarURL())
                  .setFooter(client.user.tag, client.user.displayAvatarURL())
                  .setTimestamp()

            message.channel.send(avatarEmbed);

      }
}