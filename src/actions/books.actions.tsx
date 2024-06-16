"use server";
//You can only call "use server" functions in server components. 
//However, if you are using React Query, you can call it in client components.

import SupabaseServer from "@/lib/supabase";
import { IBook, IBookWithId } from "@/types/interface";
import { cookies } from "next/headers";

export const getBooks = async () => {
  const supabase = SupabaseServer();
  const { data } = await supabase.from("books").select("*");
  return data;
};

export const getBook = async (id: string) => {
  const supabase = SupabaseServer();
  const { data } = await supabase.from("books").select("*").eq("id", id).single();
  return data;
};

export const createBooks = async ({
  title,
  author,
  publishedDate,
  genre,
}: IBook) => {
  const supabase = SupabaseServer();
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const { data, error } = await supabase.from("books").insert({ title, author, publishedDate: isoDate, genre });
  console.log(data, error)
};

export const updateBooks = async ({
  id,
  title,
  author,
  publishedDate,
  genre,
}: IBookWithId) => {
  const supabase = SupabaseServer();
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const { data, error } = await supabase.from("books").update({ title, author, publishedDate: isoDate, genre }).eq("id", id);
};

export const deleteBooks = async (id: string) => {
  const supabase = SupabaseServer();
  const { data, error } = await supabase.from("books").delete().eq("id", id);  
};
