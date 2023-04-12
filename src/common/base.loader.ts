import { StartQueryActionCreatorOptions } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { IAppDispatch, IStore } from "../redux/store";

const CLIENT_ERROR = "Bad request";
const SERVER_ERROR = "Server error";
const UNKNOWN_ERROR = "Something went wrong";
const NOT_FOUND = "Not found";
const NONE = "";

export const getErrorMessage = (status = 403) => {
  if (!status) return UNKNOWN_ERROR;
  if (status < 300) return NONE;
  if (status === 404) return NOT_FOUND;
  if (status >= 400 && status < 500) return CLIENT_ERROR;
  if (status >= 500) return SERVER_ERROR;
  return UNKNOWN_ERROR;
};

export class BaseLoader {
  _store: IStore;
  _dispatch: IAppDispatch;

  constructor(store: IStore) {
    this._store = store;
    this._dispatch = store.dispatch;
  }

  _loader = async <TEndpoint extends ApiEndpointQuery<any, any>>(
    endpoint: TEndpoint,
    request: Request,
    query: Parameters<TEndpoint["initiate"]>[0],
    queryOptions?: StartQueryActionCreatorOptions
  ): Promise<ReturnType<ReturnType<TEndpoint["initiate"]>>> => {
    const promise = this._dispatch(
      endpoint.initiate(query, queryOptions)
    );
    request.signal.onabort = promise.abort;
    const res = await promise;
    const { isError, error } = res;
    if (isError) {
      const { status = 403, data } = error as IErrObj;
      throw new Response("", {
        status,
        statusText: data?.message || getErrorMessage(status),
      });
    }
    return res as ReturnType<ReturnType<TEndpoint["initiate"]>>;
  };
}
