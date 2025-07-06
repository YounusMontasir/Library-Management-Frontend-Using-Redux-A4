import type { BooksResponse, BorrowResponse } from '@/shared/Interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const libraryApi = createApi({
    reducerPath: "libraryApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://library-management-system-using-mon.vercel.app/api'}),
    tagTypes: ['Book', 'Borrow'],
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, void>({
            query: () => 'books',
            providesTags: ['Book', 'Borrow']
        }),
        createBook  : builder.mutation({
            query: (bookData) => ({
                url: "books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ['Book']
        }),
        deleteBook : builder.mutation({
            query: (bookId) =>({
                url: `books/${bookId}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Book']
        }),
        updateBook : builder.mutation({
            query: ({bookId, updatedData}) =>({
                url: `books/${bookId}`,
                method: 'PATCH',
                body: updatedData
            }),
            invalidatesTags: ['Book']
        }),
        createBorrow: builder.mutation({
            query: (borrowData)=>({
                url: 'borrow',
                method: 'POST',
                body: borrowData
            }),
            invalidatesTags: ['Borrow']
        }),
        getAllBorrow: builder.query<BorrowResponse, void>({
            query: () => 'borrow',
            providesTags: ['Book', 'Borrow']
        })
    })
})

export const {useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation,useCreateBorrowMutation, useGetAllBorrowQuery} = libraryApi