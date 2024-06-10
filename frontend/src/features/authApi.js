import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "createApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({}),
});
