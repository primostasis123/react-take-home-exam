"use server";

import useSupabaseServer from "@/lib/supabase";
//You can only use use server in server components. However, if you are using React Query, you can call it in client components.

import { IBook, IBookWithId } from "@/types/interface";
import { cookies } from "next/headers";


export const getBooks = async () => {
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
  const { data } = await supabase.from("books").select("*");
  return data;
};

export const getBook = async (id: string) => {
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
  const { data } = await supabase.from("books").select("*").eq("id", id).single();
  return data;
};

export const createBooks = async ({
  title,
  author,
  publishedDate,
  genre,
}: IBook) => {
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
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
  const date = new Date(publishedDate);
  const isoDate = date.toISOString(); // Outputs: 2024-06-13T00:00:00.000Z
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
  const { data, error } = await supabase.from("books").update({ title, author, publishedDate: isoDate, genre }).eq("id", id);
};

export const deleteBooks = async (id: string) => {
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
  const { data, error } = await supabase.from("books").delete().eq("id", id);  
};
