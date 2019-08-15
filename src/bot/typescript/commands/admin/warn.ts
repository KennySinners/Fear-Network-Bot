import { Message, Client, MessageEmbed } from "discord.js";
import { IBot } from "../../api";
import Warn, { WarnModel } from "../../assets/mongoose/schemas/warns";
import warns from "../../assets/mongoose/schemas/warns";

export default class warn implements IBot {

      private readonly _command = "warn";

      help(): string {
            return "Warns the mentioned member";
      }

      isThisCommand(command: string): boolean {
            return command === this._command;
      }

      usage(): string {
            return "!warn {@user/user_id} {reason}"
      }

      admin_only(): boolean {
            return true
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
            const reason = args.slice(1).join(" ") || "No reason specified";
            const warnEmbed = new MessageEmbed().setFooter(message.guild.me.displayName, client.user.displayAvatarURL()).setTimestamp();

            if (!message.member.permissions.has("ADMINISTRATOR")) {
                  message.reply(`you do not have the permission`);
                  return;
            }

            if (!member) {
                  message.reply(`please mention a member or provide a member id to give a reputation point to`);
                  return;
            }

            if (!isNaN(parseInt(args[0])) && !message.guild.members.fetch(args[0])) {
                  message.reply(`the provided member was either not found in the guild`)
            }

            warnEmbed
                  .setTitle(`${member.displayName} was successfully warned by ${message.member.displayName}`)
                  .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                  .addField(`Person who was warned`, member.displayName)
                  .addField(`Who warned ${member.displayName}`, message.member.displayName)
                  .addField(`Reason for warning`, reason)

            Warn.findOne({
                  guild: message.guild.id,
                  user: member.id
            }, (err, warn) => {
                  if (err) return console.log(err);

                  if (!warn) {
                        new Warn({
                              guildID: message.guild.id,
                              user: member.id,
                              warns: 1,
                              reasons: [reason],
                              warnedby: [message.author.tag]
                        }).save().then(async () => {
                              await warnEmbed.addField(`Current warnings`, "1");
                              message.channel.send(warnEmbed);
                        }).catch(e => console.log(e));
                  } else {
                        warn.warns += 1;
                        warn.reasons.push(reason)
                        warn.warnedby.push(message.author.tag);
                        warn.save().then(async () => {
                              await warnEmbed.addField(`Current number of warnings`, warn.warns);
                              message.channel.send(warnEmbed);
                        }).catch(e => console.log(e));
                  }
            });
      }
}