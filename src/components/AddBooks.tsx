import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { IBookSlice } from "@/shared/Interface";
import { useCreateBookMutation } from "@/redux/api/librarySliceApi";
import Swal from 'sweetalert2'



const AddBooks = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IBookSlice>();

  const [createBook] = useCreateBookMutation();
  // console.log(createBook);
  
  const onSubmit: SubmitHandler<IBookSlice> =async (data) => {
    const finalData = {
      ...data, 
      available: data.copies> 0 
    }
   try {
    await createBook(finalData)
    reset();
    setOpen(false);
    Swal.fire({
  position: "center",
  icon: "success",
  title: "Book Added Successfully",
  showConfirmButton: false,
  timer: 1500
});
   } catch (error) {
    console.error("Error on creating book", error)
   }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button  variant="outline" className="bg-[#0096B5] text-white">Add Book</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title - full width */}
          <Input placeholder="Title" {...register("title", { required: true })} />
          {errors.title && <span className="text-sm text-red-500">Title is required</span>}

          {/* Author + ISBN */}
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Author" {...register("author", { required: true })} />
            <Input placeholder="ISBN" {...register("isbn", { required: true })} />
          </div>
          {(errors.author || errors.isbn) && (
            <span className="text-sm text-red-500">Author and ISBN are required</span>
          )}

          {/* Copies + Genre */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Copies"
              {...register("copies", { required: true, valueAsNumber: true })}
            />
            <Select onValueChange={(value) => setValue("genre", value as IBookSlice["genre"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                {["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(errors.copies || errors.genre) && (
            <span className="text-sm text-red-500">Copies and Genre are required</span>
          )}

          {/* Description */}
          <Textarea placeholder="Description" {...register("description", { required: true })} />
          {errors.description && <span className="text-sm text-red-500">Description is required</span>}

          <DialogFooter>
            <Button type="submit">Save Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBooks;
