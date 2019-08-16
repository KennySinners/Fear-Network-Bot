import { Document, Model, model, Schema } from "mongoose";

export interface WarnModel extends Document { 
      guildID?: string;
      user?: string;
      reasons?: Array<string>;
      warns?: number;
      warnedby?: Array<string>;
}

const Warn: Schema = new Schema({
      guildID: String,
      user: String,
      reasons: Array,
      warns: Number,
      warnedby: Array
});

export default model<WarnModel>("Warnings", Warn);