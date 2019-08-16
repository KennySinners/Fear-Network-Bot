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

      adminOnly(): boolean {
            return true;
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const member = message.mentions.members.first()
            const reason = args.slice(2).join(" ") || "No reason specified";
            const reputationEmbed = new MessageEmbed().setFooter(client.user.tag, client.user.displayAvatarURL());
            const reputationGiveEmbed = new MessageEmbed().setFooter(client.user.tag, client.user.displayAvatarURL());

            if (!member) {
                  message.reply(`please mention a member`)
            }

            Rep.findOne({
                  guildID: message.guild.id,
                  user: member.id
            }, async (err, rep) => {
                  if (err) return console.log(err);

                  if (message.content.split(" ")[1].toLowerCase() !== "give" && member) {

                        await reputationEmbed
                              .setTitle(`${member.displayName}'s reputations`)
                              .setAuthor(member.user.tag, member.user.displayAvatarURL())
                              .addField(`Reputations`, rep.reps > 0 ? rep.reps : "None")

                        for (let i = 0; i < rep.repdby.length; i++) {
                              reputationEmbed
                                    .addField(`Reputation issued by ${rep.repdby[i]}`, `Reason: **\`\`${rep.reasons[i]}\`\`** `)
                        }

                        message.channel.send(reputationEmbed);
                  } else {
                        reputationGiveEmbed
                              .setTitle(`${message.member.displayName} just gave ${member.displayName} a reputation point!`)
                              .addField("Reason", reason)

                        if (!rep) {
                              return new Rep({
                                    guildID: message.guild.id,
                                    user: member.id,
                                    reps: 1,
                                    reasons: [reason],
                                    repdby: [message.author.tag]
                              }).save()
                                    .then(() => {
                                          reputationGiveEmbed.addField("How many reputations points " + member.displayName + " has now", rep.reps);
                                          message.channel.send(reputationGiveEmbed)
                                    })
                                    .catch(e => console.log(e));
                        } else {
                              rep.reps += 1;
                              rep.reasons.push(reason);
                              rep.repdby.push(message.author.tag);
                              return rep.save()
                                    .then(() => {
                                          reputationGiveEmbed.addField("How many reputations points " + member.displayName + " has now", rep.reps);
                                          message.channel.send(reputationGiveEmbed)
                                    })
                                    .catch(e => console.log(e));
                        }
                  }
            })
      }
}