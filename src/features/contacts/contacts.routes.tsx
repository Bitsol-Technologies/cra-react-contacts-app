import { createBrowserRouter } from "react-router-dom";
import { IStore } from "../../redux/store";
// import { ContactDetail } from "./contact-detail";
// import { ContactDashboard } from "./contact-main";
import {
  addContactRedirect,
  createContactAction,
  deleteContactAction,
  editContactAction,
  toggleFavContactAction,
} from "./contacts.actions";
// import {
//   DefaultContactElement,
//   DeleteContactErr,
//   ErrorPage,
// } from "./contacts.elements";
import { ContactsLoader } from "./contacts.loaders";
// import { CreateContact } from "./create-contact";
// import { EditContact } from "./edit-contact";

export const getContactsRouter = (store: IStore) => {
  const contactsLoader = new ContactsLoader(store);
  return createBrowserRouter([
    {
      path: "/",
      // element: <ContactDashboard />,
      // Component: ContactDashboard,
      loader: contactsLoader.listLoader,
      async lazy () {
        let { ContactDashboard } = await import("./contact-main");
        return { Component: ContactDashboard };
      },
      action: addContactRedirect,
      children: [
        {
          // errorElement: <ErrorPage />,
          // ErrorBoundary: ErrorPage,
          async lazy () {
            let { ErrorPage } = await import("./contacts.elements")
            return { ErrorBoundary: ErrorPage };
          },
          children: [
            {
              index: true,
              // element: <DefaultContactElement />,
              // Component: DefaultContactElement,
              async lazy () {
                let { DefaultContactElement } = await import("./contacts.elements")
                return { Component: DefaultContactElement };
              }
            },
            {
              path: "contacts/:contactId",
              // element: <ContactDetail />,
              // Component: ContactDetail,
              async lazy () {
                let { ContactDetail } = await import("./contact-detail");
                return { Component: ContactDetail };
              },
              loader: contactsLoader.detailLoader,
              action: toggleFavContactAction(store),
            },
            {
              path: "contacts/:contactId/edit",
              // element: <EditContact />,
              // Component: EditContact,
              async lazy () {
                let { EditContact } = await import("./edit-contact");
                return { Component: EditContact };
              },
              loader: contactsLoader.detailLoader,
              action: editContactAction(store.dispatch),
              // errorElement: <ErrorPage />,
            },
            {
              path: "contacts/add",
              // element: <CreateContact />,
              // Component: CreateContact,
              async lazy () {
                let { CreateContact } = await import("./create-contact");
                return { Component: CreateContact };
              },
              action: createContactAction(store.dispatch),
            },
            {
              path: "contacts/:contactId/destroy",
              action: deleteContactAction(store.dispatch),
              // errorElement: <DeleteContactErr />,
              // ErrorBoundary: DefaultContactElement,
              async lazy () {
                let { DeleteContactErr } = await import("./contacts.elements")
                return { ErrorBoundary: DeleteContactErr };
              }
            },
          ],
        },
      ],
    },
  ]);
};
