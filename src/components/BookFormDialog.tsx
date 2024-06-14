import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createBooks, getBook, updateBooks } from "@/actions/books.actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useBookMutation } from "@/lib/hooks";
import { BookFormDialogProps } from "@/types/interface";

const BookFormDialog = ( { id, setEditingItemId, refetch }: BookFormDialogProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishedDate, setPublishDate] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const { mutate: create } = useBookMutation({ mutationFn: createBooks, setOpen, refetch, setEditingItemId });
  const { mutate: update } = useBookMutation({ mutationFn: updateBooks, setOpen, refetch, setEditingItemId });


  const { data } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id!),
    enabled: id !== "insert", // Only fetch the book if id is not "insert"
    refetchOnWindowFocus : false // Disable refetch on window focus - example when copying data from another tab or window
  });


  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setAuthor(data.author);
      const date = new Date(data.publishedDate);
      const formattedDate = date.toISOString().slice(0, 10);
      setPublishDate(formattedDate);
      setGenre(data.genre);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === "insert") {
      create({ title, author, publishedDate, genre });
    } else {
      update({id, title, author, publishedDate, genre });
    }
  };

  const handleCancel = () => {
    setEditingItemId("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[475px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add or Update a New Book</DialogTitle>
          <DialogDescription>
            Fill out the form below to add or update a new book to our library.
          </DialogDescription>
        </DialogHeader>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3 "
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                className="col-span-3"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="publish-date" className="text-right">
                Publish Date
              </Label>
              <Input
                id="publish-date"
                type="date"
                className="col-span-3 "
                required
                value={publishedDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genre" className="text-right">
                Genre
              </Label>
              <Input
                id="genre"
                className="col-span-3 "
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex-row justify-end space-x-2 ">
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default BookFormDialog;
