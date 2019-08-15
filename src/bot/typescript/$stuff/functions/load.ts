import { commands, loadAdmin, loadFun, loadMisc, loadUtil } from "./loaders";

export function load() { 
      loadAdmin(`../../commands/admin`);
      loadFun(`../../commands/fun`);
      loadMisc(`../../commands/misc`);
      loadUtil(`../../commands/util`);
}