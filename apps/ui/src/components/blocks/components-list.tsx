import Image from "next/image"
import Link from "next/link"
import { source } from "@/src/lib/source"

export function ComponentsList() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components"
  )

  const backgrounds = source.pageTree.children.find(
    (page) => page.$id === "backgrounds"
  )

  if (components?.type !== "folder" && backgrounds?.type !== "folder") {
    return null
  }

  // Collect pages from both folders
  const list = [
    ...(components?.type === "folder"
      ? components.children.filter((c) => c.type === "page")
      : []),
    ...(backgrounds?.type === "folder"
      ? backgrounds.children.filter((b) => b.type === "page")
      : []),
  ]

  return (
    <div className="grid grid-cols-1 gap-3 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item) => {
        const name = String(item.name) // normalize ReactNode → string

        return (
          <Link
            key={item.$id}
            href={item.url}
            className="flex flex-col gap-2"
          >
            {/* <ImageComponent imageBasePath={slugify(name)} alt={name} /> */}
            <span className="text-lg text-primary/60 hover:text-primary font-medium underline-offset-4 md:text-base">
              {name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

type ImageComponentProps = {
  imageBasePath: string
  alt: string
}

export function ImageComponent({ imageBasePath, alt }: ImageComponentProps) {
  return (
    <>
      <Image
        className="w-full hover:shadow-md border rounded-xl dark:hidden"
        src={`/thumbs/${imageBasePath}.jpg`}
        alt={alt}
        width={268}
        height={198}
      />
      <Image
        className="w-full hover:shadow-md hidden border rounded-xl dark:block"
        src={`/thumbs/${imageBasePath}-dark.jpg`}
        alt={`${alt} dark`}
        width={268}
        height={198}
      />
    </>
  )
}

// helper to keep file names consistent
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-")
}
