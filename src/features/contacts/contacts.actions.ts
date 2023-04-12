import { redirect, RouteObject } from "react-router-dom";
import { IAppDispatch, IStore } from "../../redux/store";
import { contactsApi } from "../../rtk/contacts.api";

export const addContactRedirect = () => {
  return redirect(`/contacts/add`);
};

export const toggleFavContactAction =
  (state: IStore): RouteObject["action"] =>
  async ({ request, params }) => {
    const { data: prevData } = contactsApi.endpoints.getContact.select(
      params.contactId || ""
    )(state.getState());
    let formData = await request.formData();
    return await state.dispatch(
      contactsApi.endpoints.updateContact.initiate({
        ...(prevData || {}),
        favorite: formData.get("favorite") === "true",
        // @ts-ignore
        id: params.contactId,
      })
    );
  };

export const createContactAction =
  (dispatch: IAppDispatch): RouteObject["action"] =>
  async ({ request }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    // @ts-ignore
    await dispatch(contactsApi.endpoints.createContact.initiate(updates));
    return redirect(`/`);
  };

export const editContactAction =
  (dispatch: IAppDispatch): RouteObject["action"] =>
  async ({ params, request }) => {
    const formData = await request.formData();
    let updates = Object.fromEntries(formData);
    // @ts-ignore
    updates = { ...updates, id: params.contactId };
    // @ts-ignore
    await dispatch(contactsApi.endpoints.updateContact.initiate(updates));
    return redirect(`/contacts/${params.contactId}`);
  };

export const deleteContactAction =
  (dispatch: IAppDispatch): RouteObject["action"] =>
  async ({ params }) => {
    await dispatch(
      // @ts-ignore
      contactsApi.endpoints.deleteContact.initiate(params.contactId)
    );
    return redirect("/");
  };
