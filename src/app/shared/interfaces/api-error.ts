export interface ApiError {
  statusDescription: string;
  statusCode: number;
  message: string;
}

export interface Api400Error extends ApiError {
  errors: {
    [key: string]: string[];
  };
}
