export interface IBookSlice {
 
_id?: string,
title: string,
author: string,
genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
isbn:string,
description: string,
copies: number,
available: boolean,
createdAt?: string,
updatedAt?: string

}
export interface IBorrowSlice{
    _id?: string,
    quantity: number,
    dueDate: Date,
    book: string,
    createdAt?: string,
    updatedAt?: string
}

export interface BooksResponse {
  success: boolean;
  message: string;
  books: IBookSlice[];
}

export interface BorrowResponse {
  success: boolean;
  message: string;
  borrow: IBorrowSummary[];
}

export interface IBorrowSummary {
  book : {
    title: string,
    isbn: string
  },
  totalQuantity: number
}
