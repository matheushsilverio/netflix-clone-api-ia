import colors from "colors";

export default abstract class Logger {
  static debug(instance: string, message: string): void {
    const date = new Date().toLocaleTimeString();
    console.log(`[${colors.cyan(instance)}] ${colors.grey(date)} ${message}`);
  }

  static error(message: string): void {
    const date = new Date().toLocaleTimeString();
    console.error(`[${colors.red("ERROR")}] ${colors.grey(date)} ${message}`);
  }

  static startingServer(environment: string, port: string): void {
    console.log(`
    ${colors.green("API Project7")}
    ${colors.grey("status")}: ${colors.green("running")}
    ${colors.grey("environment")}: ${environment}
    ${colors.grey("endpoint")}: http://localhost:${port}/
  `);
  }
}
