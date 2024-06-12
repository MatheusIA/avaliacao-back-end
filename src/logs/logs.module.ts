// logs/logs.module.ts

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LogsService } from "./schemas/logs.service";
import { Log, LogSchema } from "./schemas/log.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://userroot:ibt3rH8aiugLMBdC@ac-o7piu9e.ksgmxxl.mongodb.net/mydatabase?retryWrites=true&w=majority",
    ),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  /// controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
