import { RouteObject } from "react-router-dom";
import { BaseLoader } from "../../common/base.loader";
import { contactsApi } from "../../rtk/contacts.api";

export class ContactsLoader extends BaseLoader {
  listLoader: RouteObject["loader"] = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const { data: contacts = [] } = await this._loader(
      contactsApi.endpoints.getContactList,
      request,
      q
    );
    return { contacts, q };
  };

  detailLoader: RouteObject["loader"] = async ({ params, request }) => {
    const { data: contact } = await this._loader(
      contactsApi.endpoints.getContact,
      request,
      params.contactId || ""
    );
    return contact;
  };
}
