/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@dalim/core/ui/button'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
    onImageSelect: (imageData: string) => void
    currentImage: string | null
    onError?: (error: string) => void
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function ImageUpload({ onImageSelect, currentImage, onError }: ImageUploadProps) {
    const [, setSelectedFile] = useState<File | null>(null)

    // Update the selected file when the current image changes
    useEffect(() => {
        if (!currentImage) {
            setSelectedFile(null)
        }
    }, [currentImage])

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: string | any[]) => {
            if (fileRejections?.length > 0) {
                const error = fileRejections[0].errors[0]
                onError?.(error.message)
                return
            }

            const file = acceptedFiles[0]
            if (!file) return

            setSelectedFile(file)

            // Convert the file to base64
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const result = event.target.result as string
                    onImageSelect(result)
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            reader.onerror = (error) => {
                onError?.('Error reading file. Please try again.')
            }
            reader.readAsDataURL(file)
        },
        [onImageSelect]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
    })

    const handleRemove = () => {
        setSelectedFile(null)
        onImageSelect('')
    }

    return (
        <div className="">
            {!currentImage ? (
                <div
                    {...getRootProps()}
                    className="absolute bottom-1 left-1">
                    <input {...getInputProps()} />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10">
                        <Upload />
                        <span className="sr-only">Upload image</span>
                    </Button>
                </div>
            ) : (
                <div className="my-2">
                    <div className="relative h-20 w-20">
                        <Image
                            src={currentImage}
                            width={80}
                            height={80}
                            alt="Selected"
                            className="h-full w-full rounded-sm object-contain"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 z-10 h-5 w-5"
                            onClick={handleRemove}>
                            <X className="h-4 w-4 rounded-full bg-red-500" />
                            <span className="sr-only">Remove image</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
