import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DiffEqRequest, DiffEqResponse } from "./types";

export const diffeqApi = createApi({
  reducerPath: "diffeqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta.env.VITE_API_BASE_URL ?? "") + "/api",
  }),
  endpoints: (build) => ({
    solve: build.mutation<DiffEqResponse, DiffEqRequest>({
      query: (data) => ({
        url: "/diffeq/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSolveMutation } = diffeqApi;
