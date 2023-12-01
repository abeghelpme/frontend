export class HTTPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HTTPError";
  }
}

export class ServerError extends Error {
  status: "Error";

  constructor(apiErrorResponse: Pick<ServerError, "message" | "status">) {
    const { message = "Something went wrong", status = "Error" } =
      apiErrorResponse ?? {};

    super(message);
    this.status = status;
    this.name = "ServerError";
  }
}
