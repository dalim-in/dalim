
import { Quote } from '@/src/components/home/quote'
import { Preview } from '../../components/home/all-badges'
import { Hero } from '../../components/home/hero'
import { ProductBento } from '@/src/components/home/bento'
import { BlogHome } from '@/src/components/home/blogs'
import { Connect } from '@dalim/core/components/common/connect'

export default function Home() {
    return (
        <div>
            <Hero />
            <Preview />
            <ProductBento /> 
            <Quote/>
            <BlogHome/>
            <Connect className={"mb-10"}/>
        </div>
    )
}
