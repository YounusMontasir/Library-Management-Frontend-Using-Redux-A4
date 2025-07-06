import AddBooks from "@/components/AddBooks";
import AddBorrows from "@/components/AddBorrows";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UpdateBook from "@/components/UpdateBook";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/librarySliceApi";
import type { IBookSlice } from "@/shared/Interface";
import { Loader, Trash2 } from "lucide-react";
import Swal from "sweetalert2";



const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetBooksQuery();

  const [deleteBook] = useDeleteBookMutation()

  const handleDelete = async (bookId: string | undefined) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const deletedBook = await deleteBook(bookId).unwrap(); 
      if(deletedBook.success){
         Swal.fire({
        position: "center",
        icon: "success",
        title: "Book has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};

  return (

      <>
      {isLoading ? (
        <h1 className="min-h-screen flex flex-col items-center justify-center text-center animate-spin">
          <Loader size={50}></Loader>
        </h1>
      ):(
          <div className="w-11/12 lg:w-10/12 mx-auto mt-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-[#0096B5]">Book List</h2>
            <AddBooks />
          </div>

          <div className="border-2 rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Edit Book</TableHead>
                  <TableHead>Delete Book</TableHead>
                  <TableHead>Borrow</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allBooks && allBooks.books.map((book: IBookSlice, index: number) => (
                  <TableRow key={book._id} className="hover:bg-[#0096B5]/10 font-medium">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>{book.copies > 0 ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <UpdateBook book={book} />
                    </TableCell>
                    <TableCell>
                      <Trash2 onClick={()=>handleDelete(book._id)} className="cursor-pointer text-red-500 hover:text-red-700" />
                    </TableCell>
                    <TableCell className="">
                      <AddBorrows book={book} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      </>


  );
};

export default AllBooks;
