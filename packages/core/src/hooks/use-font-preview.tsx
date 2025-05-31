
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface FontPreviewContextType {
  previewText: string;
  setPreviewText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  textAlign: "left" | "center" | "right";
  setTextAlign: (align: "left" | "center" | "right") => void;
  letterSpacing: number;
  setLetterSpacing: (spacing: number) => void;
  showFontName: boolean;
  setShowFontName: (show: boolean) => void;
  reset: () => void;
}

const FontPreviewContext = createContext<FontPreviewContextType | undefined>(
  undefined
);

export function useFontPreview() {
  const context = useContext(FontPreviewContext);
  if (!context) {
    throw new Error("useFontPreview must be used within a FontPreviewProvider");
  }
  return context;
}

export function FontPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [previewText, setPreviewText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [fontSize, setFontSize] = useState(50);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [showFontName, setShowFontName] = useState(false);

  const reset = () => {
    setPreviewText("The quick brown fox jumps over the lazy dog.");
    setFontSize(50);
    setTextAlign("left");
    setLetterSpacing(0);
    setShowFontName(false);
  };

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreviewText = localStorage.getItem("fontPreviewText");
    const savedFontSize = localStorage.getItem("fontPreviewSize");
    const savedShowFontName = localStorage.getItem("fontShowName");

    if (savedPreviewText) setPreviewText(savedPreviewText);
    if (savedFontSize) setFontSize(Number.parseInt(savedFontSize, 10));
    if (savedShowFontName) setShowFontName(savedShowFontName === "true");
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("fontPreviewText", previewText);
    localStorage.setItem("fontPreviewSize", fontSize.toString());
    localStorage.setItem("fontShowName", showFontName.toString());
  }, [previewText, fontSize, showFontName]);

  return (
    <FontPreviewContext.Provider
      value={{
        previewText,
        setPreviewText,
        fontSize,
        setFontSize,
        textAlign,
        setTextAlign,
        letterSpacing,
        setLetterSpacing,
        showFontName,
        setShowFontName,
        reset,
      }}
    >
      {children}
    </FontPreviewContext.Provider>
  );
}