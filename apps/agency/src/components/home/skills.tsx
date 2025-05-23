'use client'

import { Badge } from '@dalim/core/ui/badge'

const skills = [
    { skill: 'Web Design' },
    { skill: 'Web Develop' },
    { skill: 'Branding' },
    { skill: 'Logo' },
    { skill: 'Social Media Graphic' },
    { skill: 'Video Editing' },
    { skill: 'Photography' },
    { skill: 'Motion Graphic' },
    { skill: 'UI-UX' },
    { skill: 'Packaging' },
    { skill: '3D' },
    { skill: 'Mockups' },
    { skill: 'Animations' },
    { skill: 'eBooks' },
    { skill: 'Brochures' }, 
    { skill: 'Landing pages' },  
    { skill: 'Invitation' },
    { skill: 'Emailers' },
    { skill: 'Ads' },
    { skill: 'Campaigns' },
    { skill: 'Brand Guidelines' },
    { skill: 'and many more...' },
]

const Skills = () => {
    return (
        <section className="mx-auto -mt-7 mb-12 max-w-4xl">
            <div className="p-10 rounded-3xl border">
                <div className="flex flex-wrap justify-center gap-2">
                    {skills.map((item, idx) => {
                        return (
                            <Badge
                                variant={'outline'}
                                key={idx}
                                className="border-dotted py-1 border-2">
                                {item.skill}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export { Skills }
