import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base.api";
import { TAG_TYPES } from "./rtk.enums";

export const contactsApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "/contacts",
  }),
  tagTypes: [TAG_TYPES.Contacts],
  endpoints: (build) => ({
    getContactList: build.query<IContact[] | undefined, string>({
      query: (q) => ({ url: `?${q ? `q=${q}` : ""}` }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: TAG_TYPES.Contacts,
                id,
              })),
              { type: TAG_TYPES.Contacts, id: "LIST" },
            ]
          : [{ type: TAG_TYPES.Contacts, id: "LIST" }],
    }),
    getContact: build.query<IContact, string>({
      query: (id) => ({ url: `/${id}` }),
      providesTags: (result, error, id) => [{ type: TAG_TYPES.Contacts, id }],
    }),
    deleteContact: build.mutation<undefined, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: TAG_TYPES.Contacts, id: "LIST" }],
    }),
    createContact: build.mutation<undefined, IContact>({
      query: (data) => ({ url: "/", method: "post", data }),
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Contacts, id: arg.id },
        { type: TAG_TYPES.Contacts, id: "List" },
      ],
    }),
    updateContact: build.mutation<undefined, IContact>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "put",
        data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.Contacts, id: arg.id },
      ],
    }),
  }),
});

export const { useGetContactListQuery, useGetContactQuery } = contactsApi;
