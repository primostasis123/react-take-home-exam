"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import BookFormDialog from "./BookFormDialog";
import { Button } from "./ui/button";
import { deleteBooks, getBooks } from "@/actions/books.actions";
import { useState } from "react";
import { useSectionObserver } from "@/lib/hooks";

import SecondFrame from "./SecondFrame";
import ThirdFrame from "./ThirdFrame";

const Books = () => {
  const [editingItemId, setEditingItemId] = useState<string>("");
  const ref = useSectionObserver('first');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const { mutate: deleteById } = useMutation({
    mutationFn: deleteBooks,
    onSuccess: () => {
      refetch();
      alert("Book Deleted Successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleEditClick = (id: string) => {
    setEditingItemId(id);
  };

  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="flex-1 p-4 md:p-6 max-w-[1000px] mx-auto  ">
        <div className="flex items-center justify-between mb-4 pt-28" id="first" ref={ref} >
          <h1 className="text-2xl font-bold">Book List</h1>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleEditClick("insert")}
          >
            Add New Book
          </Button>
        </div>
        <div className="border shadow-sm rounded-lg overflow-hidden" >
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Author
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Publish Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Genre
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {data &&
                  data.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle ">{book.title}</td>
                      <td className="p-4 align-middle ">{book.author}</td>
                      <td className="p-4 align-middle ">
                        {book.publishedDate.toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle ">{book.genre}</td>
                      <td className="p-4 align-middle ">
                        <div className="flex gap-4">
                          <div>
                            <Button
                              type="button"
                              onClick={() => handleEditClick(book.id)}
                            >
                              Edit
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="destructive"
                              onClick={() => deleteById(book.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* avoid creating jsx for no reason */}
        {editingItemId && (
          <BookFormDialog
            id={editingItemId}
            setEditingItemId={setEditingItemId}
            refetch={refetch}
          />
        )}


        <SecondFrame />
        
        <ThirdFrame />

      </main>

    </>
  );
};

export default Books;
