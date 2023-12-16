export const getResponseData = async <TResponse>(response: Response) => {
  return (await response.json()) as TResponse;
};

export class HTTPError<ErrorResponseType = Error> extends Error {
  response: ErrorResponseType;

  constructor(errorDetails: {
    message: string;
    responseData: ErrorResponseType;
  }) {
    const { message, responseData } = errorDetails;

    super((responseData as Error).message ?? message);

    this.name = "HTTPError";

    this.response = responseData;
  }
}
