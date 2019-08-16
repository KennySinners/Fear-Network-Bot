import { Message, Client, MessageEmbed } from "discord.js";
import { IBot } from "../../api";

export default class send implements IBot {

      private readonly _command = "send";

      help(): string {
            return "Sends the provided argument in an embed with the specified color hex";
      }

      isThisCommand(command: string): boolean {
            return command === this._command;
      }

      usage(): string {
            return "!send {color-hex} {text-content}";
      }

      adminOnly(): boolean {
            return false;
      }

      async runCommand(args: string[], message: Message, client: Client) {

            const hexColor = !(args.length <= 0) ? args[0][0].startsWith(("#" || "0x")) ? args[0] : "#FF0000" : "#FF0000";
            const content = !(args.length <= 0) ? args[0][0]!.startsWith(("#" || "0x")) ? args.slice(1).join(" ") : args.join(" ") : "Nothing";
            const sayEmbed = new MessageEmbed();
            let hex;

            if (!(args.length <= 0)) {
                  if (args[0][0] === ("#" || "0x")) {
                        hex = hexColor
                  } else {
                        hex = "#" + hexColor
                  }
            }

            await sayEmbed
                  .setColor(hex || "#FF0000")
                  .addField(`${message.member.displayName} said`, ` \`\`${content}\`\` `);

            message.channel.send(sayEmbed);

      }
}