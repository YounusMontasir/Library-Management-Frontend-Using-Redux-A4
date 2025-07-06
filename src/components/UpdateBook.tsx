import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { IBookSlice } from "@/shared/Interface";
import { useUpdateBookMutation } from "@/redux/api/librarySliceApi";
import Swal from "sweetalert2";
import { Edit } from "lucide-react";

interface bookProps {
  book: IBookSlice
}




const UpdateBook = ({book} : bookProps) => {

  const [open, setOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation()
  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    // formState: { errors },
  } = useForm<IBookSlice>({

  });

  const onSubmit: SubmitHandler<IBookSlice> = async(data) => {
  try {
    await updateBook({
    bookId: book._id,
    updatedData: data
   })
    setOpen(false);
     Swal.fire({
        position: "center",
        icon: "success",
        title: "Book has been Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    
  } catch (error) {
    console.log(error);
    
  }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-blue-700"><Edit></Edit></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Title" defaultValue={book.title} {...register("title", { required: true })} />

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Author"  defaultValue={book.author} {...register("author", { required: true })} />
            <Input placeholder="ISBN"  defaultValue={book.isbn} {...register("isbn", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Copies"
               defaultValue={book.copies}
              {...register("copies", { required: true, valueAsNumber: true })}
            />

            <Select
              defaultValue={book.genre}
              onValueChange={(value) => setValue("genre", value as IBookSlice["genre"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                {["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea  defaultValue={book.description} placeholder="Description" {...register("description", { required: true })} />

          <DialogFooter>
            <Button type="submit">Update Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBook;
