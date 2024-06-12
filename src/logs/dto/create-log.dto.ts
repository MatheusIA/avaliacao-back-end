export class CreateLogDto {
  message?: string;
  timestamp?: Date;
  level?: string;
  context?: string;
  stack?: string;
}
