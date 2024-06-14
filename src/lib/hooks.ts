import { IUseBookMutation, StoreState } from "@/types/interface";
import { useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { create } from "zustand";

export const useStore = create<StoreState>((set) => ({
  activeSection: "",
  setActiveSection: (section) => set({ activeSection: section }),
  refs: {},
  // setRef: (id, ref) => set((state) => ({ refs: { ...state.refs, [id]: ref } })),
}));

export const useSectionObserver = (sectionId: string) => {
  // const { setActiveSection, setRef } = useStore();
  const { setActiveSection } = useStore();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionId);
    }
  }, [inView, sectionId, setActiveSection]);

  //   useEffect(() => {
  //     setRef(sectionId, ref);
  //   }, [ref, sectionId, setRef]);

  return ref;
};

export const useBookMutation = ({
  mutationFn,
  setEditingItemId,
  setOpen,
  refetch,
}: IUseBookMutation) => {
  return useMutation({
    mutationFn,
    onSuccess: () => {
      setOpen(false);
      refetch();
      alert("Book Saved Successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setEditingItemId("");
    },
  });
};
