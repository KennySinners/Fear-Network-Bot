import { Message, Client } from "discord.js";

export interface IBot {
      [_command: string]: any;
      help(): string;
      isThisCommand(command: string): boolean;
      usage(): string;
      adminOnly(): boolean;
      runCommand(args: string[], message: Message, client: Client): Promise<void>;
}