import { useSectionObserver } from "@/lib/hooks";

const ThirdFrame = () => {
    const ref = useSectionObserver('third');
  return (
    <div
      id="third"
      className="mt-10 h-screen ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 scroll-mt-28 mb-28"
      ref={ref}
    >
      <div className=" h-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 px-7">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Third Frame
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ThirdFrame;
