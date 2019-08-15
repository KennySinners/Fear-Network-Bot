import { Message, Client, MessageEmbed, TextChannel } from "discord.js";
import { IBot } from "../../api";

export default class kick implements IBot {

      private readonly _command = "kick";

      help(): string {
            return "Kicks the mentioned member from the guild";
      }

      isThisCommand(command: string): boolean {
            return command === this._command;
      }

      usage(): string {
            return "!kick {@user/user_id} {reason}"
      }

      admin_only(): boolean {
            return true
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
            const reason = args.slice(1).join(" ") || "No reason specified";
            const kickEmbed = new MessageEmbed().setFooter(message.guild.me.displayName, client.user.displayAvatarURL()).setTimestamp();

            if (!message.member.permissions.has("KICK_MEMBERS")) {
                  message.reply(`you do not have the permission to do this`);
                  return;
            }

            if (!member) {
                  message.reply(`please mention someone!`);
                  return;
            }

            if (!isNaN(parseInt(args[0])) && !message.guild.members.fetch(args[0])) {
                  message.reply(`the member was either not found, or is not in the guild`);
                  return;
            }

            kickEmbed
            .setTitle(`${member.displayName} was kicked by ${message.member.displayName} from ${message.guild.name}`)
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .addField("Action executed by", message.member.displayName)
            .addField("Person who was kicked", member.displayName)
            .addField("His ID", member.id)
            .addField("His User Tag", member.user.tag)
            .addField("Reason for the kick", reason);

            member.kick().then(async () => {
                  await message.channel.send(`${member.displayName} was successfully kicked by ${message.member.displayName} from ${message.guild.name}.`)
                  await (message.guild.channels.find(channel => channel.name.toLowerCase().includes("logs")) as TextChannel).send(kickEmbed);
            });

      }
}