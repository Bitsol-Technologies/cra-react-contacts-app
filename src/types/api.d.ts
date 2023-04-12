type QueryActionCreatorResult =
  import("@reduxjs/toolkit/dist/query/core/buildInitiate").QueryActionCreatorResult;

type IGenericQueryResultPromise = QueryActionCreatorResult<{
  data?: any;
  error: {
    status?: number;
    data?: {
      message?: string;
    };
    message?: string;
  };
}>;

interface IErrObj {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
}
