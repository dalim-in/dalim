import Book from "@/registry/default/ui/book"; 
import { DalimYellowIcon } from "@dalim/core/components/logo";

export default function Component() {
  return (
    <main className="flex flex-col items-center gap-6">
          <Book author="Ali" color="red" textColor="white">
            <div className="space-y-2 pl-3 text-white">
              <div className="absolute right-4 top-4"><DalimYellowIcon /></div> 
              <h1 className="pt-2 text-3xl leading-7 font-semibold">
                Design <br /> Without Limits
              </h1>
              <p className="text-xs leading-3 opacity-70">
                A Practical Handbook for Visual Consistency & Creativity
              </p>
            </div>
          </Book>
        </main>
  );
}