export class HTTPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HTTPError";
  }
}

export class ServerError extends Error {
  status: "Error";

  constructor(apiErrorResponse: Pick<ServerError, "message" | "status">) {
    super(apiErrorResponse.message);
    this.status = apiErrorResponse.status;
    this.name = "ServerError";
  }
}
