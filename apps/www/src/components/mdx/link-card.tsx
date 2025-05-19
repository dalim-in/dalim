import Link from "next/link"
import Image from "next/image"

type Items = Array<{
  image: string
  darkimage: string
  name: string
  description: string
  url: string
}>

type ItemGridProps = {
  items: Items
}

const LinkCard = (props: ItemGridProps) => {
  const { items } = props

  return (
    <div className='mb-9 grid grid-cols-2 md:grid-cols-2 gap-3 lg:grid-cols-4'>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className='grid text-center rounded-lg border border-dotted no-underline transition-colors hover:bg-zinc-100 gap-3 dark:hover:bg-zinc-900'
        >
          <Image
            src={item.image}
            width={370}
            height={370}
            alt={item.name}
            className='block shrink-0 rounded-t-2xl dark:hidden' 
          />
          <Image
            src={item.darkimage}
            width={370}
            height={370}
            alt={item.name}
            className=' hidden shrink-0 rounded-t-2xl dark:block' 
          />
          <div className='flex flex-col justify-center gap-1 mb-4'>
            <div className='text-md font-semibold'>{item.name}</div>
            <div className='text-muted-foreground text-xs'>{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export { LinkCard }