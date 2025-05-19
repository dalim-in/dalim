"use client";
 
import { Inspect  } from "lucide-react";
 
export const BrandLogos = () => {
  return (
    <>
       <div className="group flex overflow-hidden py-2 [--gap:2rem] [gap:var(--gap))] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_0%,rgba(0,_0,_0,_1)_100%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              <div className="flex items-center w-28 gap-2">
                <Inspect size={24} />
                <p className="text-lg font-semibold opacity-80">Spotify</p>
              </div>
              <div className="flex items-center w-28 gap-2">
                <Inspect size={24} />
                <p className="text-lg font-semibold opacity-80">YouTube</p>
              </div>
              <div className="flex items-center w-28 gap-2">
                <Inspect size={24} />
                <p className="text-lg font-semibold opacity-80">Amazon</p>
              </div>

              <div className="flex items-center w-28 gap-2">
                <Inspect size={24} />
                <p className="text-lg font-semibold opacity-80">Google</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
  