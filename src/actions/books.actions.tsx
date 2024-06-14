"use server";

import { db } from "@/lib/db";
import { IBook, IBookWithId } from "@/types/interface";

export const getBooks = async () => {
  const books = await db.book.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return books;
};

export const getBook = async (id: string) => {
  const book = await db.book.findUnique({
    where: {
      id,
    },
  });

  return book;
};

export const createBooks = async ({
  title,
  author,
  publishedDate,
  genre,
}: IBook) => {
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const book = await db.book.create({
    data: {
      title,
      author,
      publishedDate: date,
      genre,
    },
  });
};

export const updateBooks = async ({
  id,
  title,
  author,
  publishedDate,
  genre,
}: IBookWithId) => {
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const book = await db.book.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      publishedDate: date,
      genre,
    },
  });
};

export const deleteBooks = async (id: string) => {
  const book = await db.book.delete({
    where: {
      id,
    },
  });
};
