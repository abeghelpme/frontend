export type ApiErrorResponse = {
  status: "Error";
  message: string;
};

export class AbegAPIError extends Error {
  statusCode: number;
  statusInfo: string;
  response: ApiErrorResponse;

  constructor(errorDetails: {
    statusCode: number;
    statusInfo: string;
    message: string;
    responseData: ApiErrorResponse;
  }) {
    const {
      statusCode,
      statusInfo = "Http Response Error",
      message,
      responseData,
    } = errorDetails;

    super(message);
    this.name = "AbegAPIError";
    this.statusCode = statusCode;
    this.statusInfo = statusInfo;
    this.response = responseData;
  }
}
