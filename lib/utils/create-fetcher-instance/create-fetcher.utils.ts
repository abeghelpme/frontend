export class HTTPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HTTPError";
  }
}
