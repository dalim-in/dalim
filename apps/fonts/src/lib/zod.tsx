import z from 'zod'

export const MAX_FONT_FILE_SIZE = 2 * 1024 * 1024
export const MAX_ZIP_FILE_SIZE = 10 * 1024 * 1024
export const ACCEPTED_FONT_TYPES = ['.ttf', '.otf', '.woff', '.woff2']
export const ACCEPTED_ZIP_TYPES = ['.zip']

export const fontSchema = z.object({
    name: z.string().min(2, { message: 'Font name must be at least 2 characters' }),
    description: z.string().optional(),
    fontFiles: z.coerce.number().optional(),
    licenceUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
    type: z.enum(['TTF', 'OTF', 'WOFF', 'WOFF2', 'OTHER']),
    category: z.enum(['SANS_SERIF', 'SERIF', 'MONOSPACE', 'DISPLAY', 'HANDWRITING', 'SCRIPT', 'DECORATIVE', 'OTHER']),
    tags: z.string().optional(), 
    fontFile: z
        .any()
        .refine((file) => file?.size <= MAX_FONT_FILE_SIZE, 'File size must be less than 10MB')
        .refine((file) => ACCEPTED_FONT_TYPES.some((ext) => file?.name?.toLowerCase().endsWith(ext)), 'Only TTF, OTF, WOFF, and WOFF2 files are accepted'),
    zipFile: z
        .any()
        .optional()
        .nullable()
        .refine((file) => !file || file?.size <= MAX_ZIP_FILE_SIZE, 'File size must be less than 10MB')
        .refine((file) => !file || ACCEPTED_ZIP_TYPES.some((ext) => file?.name?.toLowerCase().endsWith(ext)), 'Only ZIP files are accepted'),
})

export type FontFormValues = z.infer<typeof fontSchema>

export const fontEditSchema = z.object({
    name: z.string().min(2, { message: 'Font name must be at least 2 characters' }),
    description: z.string().optional(),
    fontFiles: z.coerce.number().optional(),
    licenceUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
    category: z.enum(['SANS_SERIF', 'SERIF', 'MONOSPACE', 'DISPLAY', 'HANDWRITING', 'SCRIPT', 'DECORATIVE', 'OTHER']),
    type: z.enum(['TTF', 'OTF', 'WOFF', 'WOFF2', 'OTHER']),
    
})

export type FontEditFormValues = z.infer<typeof fontEditSchema>
