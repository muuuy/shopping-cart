import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `/pokemon/${name}`,
    }),

    getItemByName: builder.query({
      query: (name) => `/item/${name}`,
    }),
  }),
});

export const { useGetPokemonByName, useGetItemByName } = itemApi;
