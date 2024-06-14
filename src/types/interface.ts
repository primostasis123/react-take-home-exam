import { MutationFunction } from "@tanstack/react-query";

export type IBook = {
    title: string;
    author: string;
    publishedDate: string;
    genre:string
}

export type IBookWithId = IBook & {
    id?: string
}

export interface BookFormDialogProps {
    id: string;
    setEditingItemId: (value: string) => void 
    refetch: () => void
};
  
export interface IUseBookMutation {
    mutationFn: MutationFunction<void, IBookWithId>;
    setEditingItemId: (value: string) => void;
    setOpen: (value: boolean) => void;
    refetch: () => void
}

export interface StoreState {
    activeSection: string;
    setActiveSection: (section: string) => void;
    refs: { [key: string]: (node?: Element | null) => void };
    // setRef: (id: string, ref: (node?: Element | null) => void) => void;
}