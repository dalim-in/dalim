import Image from "next/image"
import Link from "next/link"
import { categories } from "@/src/config/components"
import { Button } from "@dalim/core/ui/button"

export function CategoryUI() {
  return (
    <div data-home className="mx-auto max-w-6xl border-x px-6 py-6">
      <div className="relative">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {categories
            .sort((a, b) => {
              if (a.isNew && !b.isNew) return -1
              if (!a.isNew && b.isNew) return 1
              return 0
            })
            .map((category) => (
              <CategoryCard
                key={category.slug}
                slug={category.slug}
                name={category.name}
                componentsCount={category.components.length}
                isNew={category.isNew}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export function CategoryHomeUI() {
  return (
    <div data-home className="mx-auto max-w-6xl border-x px-6 py-6">
      <div className="relative">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {categories
            .slice(0, 6)
            .sort((a, b) => {
              if (a.isNew && !b.isNew) return -1
              if (!a.isNew && b.isNew) return 1
              return 0
            })
            .map((category) => (
              <CategoryCard
                key={category.slug}
                slug={category.slug}
                name={category.name}
                componentsCount={category.components.length}
                isNew={category.isNew}
              />
            ))}
        </div>
        <Link className="flex justify-center pt-6" href={"/ui"}>
          <Button>View All UI</Button>
        </Link>
      </div>
    </div>
  )
}

type CategoryCardProps = {
  slug: string
  name: string
  componentsCount?: number
  isNew?: boolean
}

function CategoryCard({
  slug,
  name,
  componentsCount,
  isNew = false,
}: CategoryCardProps) {
  const href = `/${slug}`
  const imageBasePath = `/thumbs/${slug}`
  const alt = `${name} components`
  const isComingSoon = componentsCount === undefined

  return (
    <div className="space-y-3 text-center">
      {isComingSoon ? (
        <div className="relative inline-flex overflow-hidden rounded-xl border sm:flex dark:border-zinc-700/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-5 right-5 z-10 text-zinc-400 dark:text-zinc-500"
            width="27"
            height="13"
            fill="currentColor"
          >
            <title>Coming Soon</title>
            <path d="M21.74 12.504c-.27 0-.461-.088-.573-.266-.112-.177-.168-.48-.168-.91 0-.345.042-.774.126-1.288.093-.513.205-1.078.336-1.694.13-.625.266-1.27.406-1.932-.57.775-1.2 1.396-1.89 1.862a5.728 5.728 0 0 1-2.268.896c-.196.458-.42.873-.672 1.246a3.67 3.67 0 0 1-.826.896c-.299.224-.612.336-.938.336-.402 0-.742-.163-1.022-.49-.27-.326-.406-.802-.406-1.428 0-.43.056-.812.168-1.148.112-.345.238-.592.378-.742a3.35 3.35 0 0 1-.196-1.19c0-.55.126-1.036.378-1.456.252-.43.588-.76 1.008-.994.42-.242.872-.364 1.358-.364.392 0 .742.182 1.05.546.308.364.462.887.462 1.568 0 .635-.112 1.34-.336 2.114a5.983 5.983 0 0 0 1.54-.896 10.364 10.364 0 0 0 1.512-1.442c.485-.56.924-1.18 1.316-1.862a.483.483 0 0 1 .434-.252c.168 0 .298.052.392.154a.503.503 0 0 1 .154.392c0 .047-.028.206-.084.476-.047.27-.112.616-.196 1.036-.075.42-.159.882-.252 1.386-.094.504-.187 1.013-.28 1.526-.084.514-.154.99-.21 1.428a57.095 57.095 0 0 1 1.554-2.772c.29-.476.564-.91.826-1.302.27-.392.508-.704.714-.938.214-.242.382-.364.504-.364.224 0 .42.075.588.224.168.15.252.304.252.462 0 .215-.024.542-.07.98-.047.43-.103.915-.168 1.456l-.196 1.624a106.6 106.6 0 0 0-.168 1.47c-.047.439-.07.766-.07.98 0 .14-.06.266-.182.378a.584.584 0 0 1-.406.168.391.391 0 0 1-.266-.098c-.066-.056-.117-.186-.154-.392-.038-.205-.056-.522-.056-.952 0-.42.014-.877.042-1.372a39.09 39.09 0 0 1 .112-1.498 27.3 27.3 0 0 1 .182-1.358c-.215.355-.462.78-.742 1.274-.27.495-.556 1.004-.854 1.526a56.588 56.588 0 0 1-.868 1.47c-.28.458-.532.826-.756 1.106-.224.28-.397.42-.518.42Z" />
          </svg>
          <ImageComponent imageBasePath={imageBasePath} alt={alt} />
        </div>
      ) : (
        <Link
          href={href}
          className="peer relative inline-flex overflow-hidden rounded-xl border sm:flex dark:border-zinc-700/80"
          tabIndex={-1}
        >
          {isNew && (
            <span className="top-3 absolute left-3 rounded-md bg-[#fff000] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
              New
            </span>
          )}
          <ImageComponent imageBasePath={imageBasePath} alt={alt} />
        </Link>
      )}
      <div className="[&_a]:peer-hover:underline">
        <h2>
          {!isComingSoon ? (
            <Link href={href} className="text-sm font-medium hover:underline">
              {name}
            </Link>
          ) : (
            <span className="text-sm font-medium">{name}</span>
          )}
        </h2>
        <p className="text-muted-foreground text-[13px]">
          {!isComingSoon
            ? `${componentsCount} ${componentsCount === 1 ? "Component" : "Components"}`
            : "-"}
        </p>
      </div>
    </div>
  )
}

type ImageComponentProps = {
  imageBasePath: string
  alt: string
}

function ImageComponent({ imageBasePath, alt }: ImageComponentProps) {
  return (
    <>
      <Image
        className="w-full dark:hidden"
        src={`${imageBasePath}.jpg`}
        alt={alt}
        width={268}
        height={198}
      />
      <Image
        className="hidden w-full dark:block"
        src={`${imageBasePath}-dark.jpg`}
        alt={`${alt} dark`}
        width={268}
        height={198}
      />
    </>
  )
}
