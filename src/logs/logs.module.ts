// logs/logs.module.ts

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LogsService } from "./schemas/logs.service";
import { Log, LogSchema } from "./schemas/log.schema";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOSE_URL || ""),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  /// controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
