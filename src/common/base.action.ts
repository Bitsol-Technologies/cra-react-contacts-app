import { IAppDispatch, IStore } from "../redux/store";

export class BaseAction {
  _store: IStore;
  _dispatch: IAppDispatch;

  constructor(store: IStore) {
    this._store = store;
    this._dispatch = store.dispatch;
  }

  //     _action = async (endpoint, reqBody) =>
  //         await this._dispatch(endpoint.initiate(reqBody));
  //
}
