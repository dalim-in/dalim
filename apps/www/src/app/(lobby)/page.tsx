import { Quote } from '@/src/components/home/quote'
import { Preview } from '../../components/home/all-badges'
import { Hero } from '../../components/home/hero'
import { ProductBento } from '@/src/components/home/bento'
import { BlogHome } from '@/src/components/home/blogs'
import { Connect } from '@dalim/core/components/common/connect'
import { GradientBars } from '@dalim/core/components/backgrunds/gradient-bars'
import { StaggerTestimonials } from '@/src/components/home/testimonials'
import { EmailForm } from '@/src/components/home/email-form'
// import { AdBanner } from "@dalim/core/components/common/adbanner";

export default function Home() {
     
    return (
        <div>
            <section className="relative -mx-6 mb-6 flex flex-col items-center overflow-hidden px-6 sm:px-8 md:px-12">
                <GradientBars />
                <Hero />
                <Preview />
            </section>
            <ProductBento />
            <Quote />
            <StaggerTestimonials />
            <EmailForm />
            {/*<AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot="5400508594"
            />*/}
            <BlogHome />
            <Connect className={'mb-10'} />
        </div>
    )
}
