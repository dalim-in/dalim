
import { Quote } from '@/src/components/home/quote'
import { Preview } from '../../components/home/all-badges'
import { Hero } from '../../components/home/hero'
import { ProductBento } from '@/src/components/home/bento'
import { BlogHome } from '@/src/components/home/blogs'

export default function Home() {
    return (
        <div>
            <Hero />
            <Preview />
            <ProductBento /> 
            <Quote/>
            <BlogHome/>
        </div>
    )
}
