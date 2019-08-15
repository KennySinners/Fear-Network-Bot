import { Message, Client, MessageEmbed, Collection } from "discord.js";
import { config } from "../../config";
import { IBot } from "../../api";
import { Handler } from "../../$stuff/classes/commandhandler";
import { load } from "../../$stuff/functions/load";
import { connect } from "../../$stuff/functions/connect";

export const client: Client = new Client({ disableEveryone: true });

const secondClient: Handler = new Handler(client);

export function Run() {

      connect();

      load();

      secondClient.readyEvent();

      secondClient.handleMessage();

      client.login(config.token);
}