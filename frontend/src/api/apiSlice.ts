import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

type Item = {
  id: string;
  name: string;
  description: string;
}

export const apiSlice = createApi ({
  reducerPath: 'api',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api'}),
  endpoints: (builder) => ({
    getItem: builder.query<Item[], {page?:number; limit?:number}>({
      query: ({page=1,limit=10}) => `/items?page=${page}&limit=${limit}`,
      providesTags: ['Items'],
    }),
    createItem: builder.mutation<Item, Partial<Item>>({
      query: (newItem) => ({
        url: '/items',
        method: 'POST',
        body: newItem
      }),
      invalidatesTags: ['Items']
    }),
    deleteItem:builder.mutation<void, string>({ 
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Items']
    }),
    updateItem: builder.mutation<Item, Partial<Item> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/items/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['Items']
    })
  })
});

export const {
  useGetItemQuery, 
  useCreateItemMutation, 
  useDeleteItemMutation, 
  useUpdateItemMutation,
  useLazyGetItemQuery
} = apiSlice