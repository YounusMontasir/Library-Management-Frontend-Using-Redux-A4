import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllBorrowQuery } from "@/redux/api/librarySliceApi";
import type { IBorrowSummary } from "@/shared/Interface";
import { Loader } from "lucide-react";



const BorrowSummary = () => {
    const {data: allBorrow, isLoading} = useGetAllBorrowQuery()
    
    return (
      <>
      {isLoading ? (
        <h1 className="min-h-screen flex flex-col items-center justify-center text-center animate-spin">
             <Loader size={50}></Loader>
        </h1>
      ): (
         <div className="w-10/12 mx-auto mt-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-[#0096B5]">Borrow List</h2>
          </div>

          <div className="border-2 rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Total Borrowed</TableHead>
                  
                </TableRow>
              </TableHeader>

              <TableBody>
                {allBorrow && allBorrow.borrow.map((borrow: IBorrowSummary, index: number) => (
                  <TableRow key={index} className="hover:bg-[#0096B5]/10 font-medium">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{borrow.book.title}</TableCell>
                    <TableCell>{borrow.book.isbn}</TableCell>
                    <TableCell>{borrow.totalQuantity}</TableCell>
                    
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

export default BorrowSummary;