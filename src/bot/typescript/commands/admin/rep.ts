import { Message, Client, MessageEmbed } from "discord.js";
import { IBot } from "../../api";
import Rep, { RepModel } from "../../assets/mongoose/schemas/reputation";

export default class rep implements IBot {

      private readonly _command = "rep";

      help(): string {
            return "'!rep give': Gives a reputation point to the mentioned member \n'!rep': Shows all the reputation points the member has";
      }

      isThisCommand(command: string): boolean {
            return command === this._command;
      }

      usage(): string {
            return "'!rep give': !rep give {@user/user_id} {reason} \n'!rep': !rep {@user/user_id}";
      }

      admin_only(): boolean {
            return false && true;
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
            const reason = args.slice(2).join(" ");
            const reputationEmbed = new MessageEmbed().setFooter(client.user.tag, client.user.displayAvatarURL());
            const reputationGiveEmbed = new MessageEmbed().setFooter(client.user.tag, client.user.displayAvatarURL());

            if(!message.mentions.members.first() || !(await message.guild.members.fetch(args[0]))) { 
                  message.reply(`please mention a member`)
            }
            
            Rep.findOne({
                  guildID: message.guild.id,
                  user: member.id
            }, async (err, rep) => {
                  if (args[1].toLowerCase() === "give") {
                        if (err) return console.log(err);

                        if (!rep) {
                              return new Rep({
                                    guildID: message.guild.id,
                                    user: member.id,
                                    reps: 1,
                                    reasons: [reason],
                                    repdby: [message.author.tag]
                              }).save()
                              .then(() => message.channel.send(reputationGiveEmbed))
                              .catch(e => console.log(e));
                        } else {
                              rep.reps += 1;
                              rep.reasons.push(reason);
                              rep.repdby.push(message.author.tag);
                              return rep.save()
                              .then(() => message.channel.send(reputationGiveEmbed))
                              .catch(e => console.log(e));
                        }
                  } else {
                        await reputationEmbed
                        .setTitle(`${member.displayName}'s reputations`)
                        .setAuthor(member.user.tag, member.user.displayAvatarURL())
                        .addField(`Reputations`, rep.reps)

                        for (let i = 0; i < rep.repdby.length; i++) { 
                              reputationEmbed
                              .addField(`Reputation issued by ${rep.repdby[i]}`, `Reason: **\`\`${rep.reasons[i]}\`\`** `)
                        }

                        message.channel.send(reputationEmbed);
                  }
            })
      }
}