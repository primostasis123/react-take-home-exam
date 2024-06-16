import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string) {
  const new_date = new Date(date);
  // Get the year, month, and day
  const year = new_date.getFullYear();
  const month = ('0' + (new_date.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ('0' + new_date.getDate()).slice(-2);
  // Format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}