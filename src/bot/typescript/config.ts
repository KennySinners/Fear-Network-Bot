import { conf } from "./conf";

export let config = { 
      token: conf.token,
      prefix: "!",
      commands: {
            admin: ["ban", "kick", "warn", "rep"],
            fun: ["send", "avatar"],
            misc: ["help"],
            util: ["info"]
      }
}