import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import type { IBookSlice, IBorrowSlice } from "@/shared/Interface";
import { useCreateBorrowMutation } from "@/redux/api/librarySliceApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

interface bookProps {
  book: IBookSlice
}


const AddBorrows = ({book}: bookProps) => {
  const [open, setOpen] = useState(false);
  const [createBorrow] = useCreateBorrowMutation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBorrowSlice>();

  const onSubmit: SubmitHandler<IBorrowSlice> = async (data) => {
    const finalData = {
          ...data, 
          book: book._id 
        }
       try {
        await createBorrow(finalData)
        reset();
        setOpen(false);
        Swal.fire({
      position: "center",
      icon: "success",
      title: "Book Borrowed Succesfully",
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/borrow-summary")
       } catch (error) {
        console.error("Error on borrwed book", error)
       }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={book.copies <= 0}  variant="outline" className="bg-[#0096B5] text-white">Borrow</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         

          {/* Quantity + Due Date */}
          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col">
    <Input
      type="number"
      placeholder="Quantity"
      {...register("quantity", {
        required: "Quantity is required",
        valueAsNumber: true,
        validate: (value) =>
          value <= book.copies || "Quantity cannot exceed available copies",
      })}
    />
    {errors.quantity && (
      <span className="text-sm text-red-500 mt-1">
        {errors.quantity.message}
      </span>
    )}
  </div>

            <Input type="date" placeholder="Due Date" {...register("dueDate", { required: true })} />
          </div>
          {(errors.dueDate || errors.dueDate) && (
            <span className="text-sm text-red-500">Quantity and Due Date are required</span>
          )}

         

          <DialogFooter>
            <Button type="submit">Save Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBorrows;
