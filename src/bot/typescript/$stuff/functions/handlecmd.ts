import { Message } from "discord.js";
import { config } from "../../config";
import { commands } from "./loaders";
import { client } from "./onelineindex";

export async function handleCommand(message: Message) {

      let command = message.content.split(" ")[0].replace(config.prefix, "").toLowerCase();
      let args = message.content.split(" ").slice(1);

      for (const cmd of commands) {
            try {
                  if (!cmd.isThisCommand(command)) {
                        continue;
                  }

                  await cmd.runCommand(args, message, client);
            } catch (e) {
                  console.log(e);
            }
      }
}