import { Client } from "discord.js";
import { config } from "../../config";
import { client } from "../functions/onelineindex";
import { cmds } from "../functions/loaders";
import { handleCommand } from "../functions/handlecmd";

const cliet: Client = client

export class Handler {
      bot: Client

      constructor(cliet) {
            this.bot = cliet;
      }

      readyEvent() { 
            this.bot.on("ready", () => {
                  console.log(`Ready. \nLogged in as ${client.user.tag}. \nWatching over ${client.guilds.size} guilds`)
                  this.bot.user.setActivity(`Looking over ${client.users.size} cached members`, { type: "STREAMING", url: "https://www.twitch.tv/monstercat"})
            })
      }

      handleMessage() {
            this.bot.on("message", message => {

                  if (message.author.bot) { return; }
                  if (message.channel.type === "dm") { return; }
                  if (!message.content.toLowerCase().startsWith(config.prefix) && message.content.slice(config.prefix.length).toLowerCase().split(" ")[0].length <= 0) { return; }

                  handleCommand(message);

            })
      }
}