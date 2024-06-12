import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  level: string;

  @Prop()
  context: string;

  @Prop()
  stack: string;

  constructor() {
    super();
    this.message = "";
    this.timestamp = new Date();
    this.level = "";
    this.context = "";
    this.stack = "";
  }
}

export const LogSchema = SchemaFactory.createForClass(Log);
