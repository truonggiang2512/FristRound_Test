export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private level: LogLevel

  constructor() {
    this.level = process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG
  }

  private log(level: LogLevel, message: string, meta?: any) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString()
      const levelName = LogLevel[level]

      const logEntry = {
        timestamp,
        level: levelName,
        message,
        ...(meta && { meta }),
      }

      if (level === LogLevel.ERROR) {
        console.error(JSON.stringify(logEntry))
      } else if (level === LogLevel.WARN) {
        console.warn(JSON.stringify(logEntry))
      } else {
        console.log(JSON.stringify(logEntry))
      }
    }
  }

  error(message: string, meta?: any) {
    this.log(LogLevel.ERROR, message, meta)
  }

  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, message, meta)
  }

  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, message, meta)
  }

  debug(message: string, meta?: any) {
    this.log(LogLevel.DEBUG, message, meta)
  }
}

export const logger = new Logger()
