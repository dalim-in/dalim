"use client";

import { useState,  useRef } from "react";
import { Input } from "@dalim/core/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select";
import { Search } from "lucide-react";
import { useFontPreview } from "@/src/hooks/use-font-preview";

interface FontGlyphsProps {
  fontId: string;
  fontFamily: string;
}

export function FontGlyphs({ fontFamily }: FontGlyphsProps) { 
  useFontPreview();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [category, setCategory] = useState("all");
  const previewRef = useRef<HTMLDivElement>(null);

  // Character sets
  const basicLatinChars = Array.from({ length: 95 }, (_, i) =>
    String.fromCodePoint(i + 32)
  );
  const latinSupplementChars = Array.from({ length: 96 }, (_, i) =>
    String.fromCodePoint(i + 160)
  );
  const extendedLatinChars = Array.from({ length: 128 }, (_, i) =>
    String.fromCodePoint(i + 256)
  );
  const punctuationChars = '.,;:!?"\'()[]{}<>«»„""/|@#$%^&*-_=+~`';
  const numberChars = "0123456789";
  const symbolChars = "©®™§¶†‡•◊♠♣♥♦★☆✓✗✕✖✚✜✱✸✿❀❁❂❃❄❅❆❇❈❉❊❋";

  // All characters combined
  const allChars = [
    ...basicLatinChars,
    ...latinSupplementChars,
    ...extendedLatinChars,
    ...punctuationChars.split(""),
    ...numberChars.split(""),
    ...symbolChars.split(""),
  ];

  // Filter characters based on search term and category
  const getFilteredChars = () => {
    let chars = allChars;

    // Filter by category if not "all"
    if (category !== "all") {
      switch (category) {
        case "uppercase":
          chars = chars.filter((char) => char >= "A" && char <= "Z");
          break;
        case "lowercase":
          chars = chars.filter((char) => char >= "a" && char <= "z");
          break;
        case "numbers":
          chars = chars.filter((char) => char >= "0" && char <= "9");
          break;
        case "punctuation":
          chars = chars.filter((char) => punctuationChars.includes(char));
          break;
        case "symbols":
          chars = chars.filter((char) => symbolChars.includes(char));
          break;
      }
    }

    // Filter by search term
    if (searchTerm) {
      chars = chars.filter(
        (char) =>
          char.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `U+${char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}`.includes(
            searchTerm.toUpperCase()
          )
      );
    }

    return chars;
  };

  const filteredChars = getFilteredChars();
 

  return (
    <div className="mt-3 font-glyph-section"> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left column - Preview area with guidelines */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4  ">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Preview
            </h3>

            <div ref={previewRef} className="relative h-[460px] mb-20  ">
              <div className="absolute left-0 right-0 pointer-events-none h-full">
                <div
                  className="text-center z-10 flex items-center justify-center h-full"
                  style={{
                    fontFamily: fontFamily,
                    fontSize: `${400}px`,
                  }}
                >
                  {hoveredChar || "A"}
                </div>

                {/* Cap height */}
                <div
                  className="absolute border-dotted w-full border-t border-blue-400"
                  style={{ top: `52px` }}
                >
                  <span className="absolute -top-4 left-0 text-xs text-blue-500">
                    Cap height
                  </span>
                </div>

                {/* x-height */}
                <div
                  className="absolute w-full border-dotted border-t border-green-400"
                  style={{ top: `142px` }}
                >
                  <span className="absolute -top-4 left-0 text-xs text-green-500">
                    x-height
                  </span>
                </div>

                {/* Baseline */}
                <div
                  className="absolute w-full border-dotted border-t border-red-400"
                  style={{ top: `407px` }}
                >
                  <span className="absolute -top-4 left-0 text-xs text-red-500">
                    Baseline
                  </span>
                </div>

                {/* Descender */}
                <div
                  className="absolute w-full border-t border-purple-400"
                  style={{ top: `482px` }}
                >
                  <span className="absolute -top-4 left-0 text-xs text-purple-500">
                    Descender
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Glyphs */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search characters or Unicode (e.g., U+0041)..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-48">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Characters</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="numbers">Numbers</SelectItem>
                  <SelectItem value="punctuation">Punctuation</SelectItem>
                  <SelectItem value="symbols">Symbols</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg p-4  overflow-y-auto max-h-[550px]">
            <div className="grid grid-cols-6 border-l border-b border-dotted sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {filteredChars.length > 0 ? (
                filteredChars.map((char, index) => (
                  <div
                    key={index}
                    className="aspect-square flex items-center justify-center  border-t border-r border-dotted hover:bg-muted transition-colors cursor-pointer relative group"
                    style={{
                      fontFamily: fontFamily,
                      fontSize: "24px",
                    }}
                    onMouseEnter={() => setHoveredChar(char)}
                    onMouseLeave={() => setHoveredChar(null)}
                    onClick={() => {
                      navigator.clipboard.writeText(char);
                      // Optional: Add a toast notification here
                    }}
                    title={`Unicode: U+${char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}`}
                  >
                    {char}
                    <div className="absolute bottom-0 left-0 right-0  text-[8px] text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      U+
                      {char
                        .codePointAt(0)
                        ?.toString(16)
                        .toUpperCase()
                        .padStart(4, "0")}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full h-full text-center py-8 text-muted-foreground">
                  No characters found matching your search.
                </div>
              )}
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}