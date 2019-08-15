import { Document, Model, model, Schema } from "mongoose";

export interface RepModel extends Document { 
      guildID?: string;
      user?: string;
      reps?: number;
      reasons?: Array<string>;
      repdby?: Array<string>;
}

const Rep: Schema = new Schema({
      guildID: String,
      user: String,
      reps: Number,
      reasons: Array,
      repdby: Array
});

export default model<RepModel>("Reputation", Rep);