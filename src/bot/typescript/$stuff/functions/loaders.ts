import { config } from "../../config";
import { IBot } from "../../api";

export const commands: IBot[] = [];

export let cmds = {
      commands: commands
}

export function loadAdmin(commandsPath: string) {

      if (!config || (config.commands.admin as string[]).length === 0) { return; }

      for (const cmdName of config.commands.admin as string[]) {

            const cmdclass = require(`${commandsPath}/${cmdName}`).default;

            const cmd = new cmdclass() as IBot;

            commands.push(cmd);
      }
}

export function loadFun(commandsPath: string) {

      if (!config || (config.commands.fun as string[]).length === 0) { return; }

      for (const cmdName of config.commands.fun as string[]) {

            const cmdclass = require(`${commandsPath}/${cmdName}`).default;

            const cmd = new cmdclass() as IBot;

            commands.push(cmd);
      }
}

export function loadMisc(commandsPath: string) { 
      
      if (!config || (config.commands.misc as string[]).length === 0) { return; }

      for (const cmdName of config.commands.misc as string[]) {

            const cmdclass = require(`${commandsPath}/${cmdName}`).default;

            const cmd = new cmdclass() as IBot;

            commands.push(cmd);
      }
}

export function loadUtil(commandsPath: string) { 
      
      if (!config || (config.commands.util as string[]).length === 0) { return; }

      for (const cmdName of config.commands.util as string[]) {

            const cmdclass = require(`${commandsPath}/${cmdName}`).default;

            const cmd = new cmdclass() as IBot;

            commands.push(cmd);
      }
}