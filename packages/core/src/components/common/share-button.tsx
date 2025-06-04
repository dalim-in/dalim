"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label" 
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail, MessageCircle, QrCode, Check } from 'lucide-react'
import { toast } from "../../hooks/use-toast"
import { QRCodeSVG } from "qrcode.react"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  image?: string
  type?: "graphic" | "font" | "profile" | "general"
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showText?: boolean
}

export function ShareButton({
  url,
  title,
  description = "",
  image,
  type = "general",
  variant = "outline",
  size = "default",
  showText = true,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Ensure URL is absolute
  const fullUrl = url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`

  // Ensure image URL is absolute if provided
  const fullImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${typeof window !== "undefined" ? window.location.origin : ""}${image}`
    : undefined

  // Encode components for URLs
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareData = {
    title,
    text: description,
    url: fullUrl,
  }

  // Social media share URLs with proper image handling
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}${fullImageUrl ? `&picture=${encodeURIComponent(fullImageUrl)}` : ""}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${description ? `%20-%20${encodedDescription}` : ""}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, 
    email: `mailto:?subject=${encodedTitle}&body=${description ? `${encodedDescription}%0A%0A` : ""}${encodedUrl}`,
    pinterest: fullImageUrl
      ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(fullImageUrl)}&description=${encodedTitle}`
      : undefined,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", error)
      }
    } else {
      // Fallback to copy link
      handleCopyLink()
    }
  }

  const handleSocialShare = (platform: keyof typeof shareUrls) => {
    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case "graphic":
        return "🎨"
      case "font":
        return "🔤"
      case "profile":
        return "👤"
      default:
        return "🔗"
    }
  }

  const getTypeText = () => {
    switch (type) {
      case "graphic":
        return "Share this graphic"
      case "font":
        return "Share this font"
      case "profile":
        return "Share this profile"
      default:
        return "Share this link"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Share2 className="h-4 w-4" />
          {showText && size !== "icon" && <span className="">Share</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Native Share (if supported) */}
        {typeof window !== "undefined" && !navigator.share && (
          <>
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share2 className="h-4 w-4" />
              Share...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Copy Link */}
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy link"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Social Media Shares */}
        <DropdownMenuItem onClick={() => handleSocialShare("facebook")}>
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleSocialShare("twitter")}>
          <Twitter className="h-4 w-4 text-blue-400" />
          Twitter
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleSocialShare("linkedin")}>
          <Linkedin className="h-4 w-4 text-blue-700" />
          LinkedIn
        </DropdownMenuItem>

        {/* Pinterest (only if image is available) */}
        {fullImageUrl && (
          <DropdownMenuItem onClick={() => handleSocialShare("pinterest")}>
            <div className="h-4 w-4 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            Pinterest
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Messaging Apps */}
        <DropdownMenuItem onClick={() => handleSocialShare("whatsapp")}>
          <MessageCircle className="h-4 w-4 text-green-500" />
          WhatsApp
        </DropdownMenuItem>
 
        <DropdownMenuItem onClick={() => handleSocialShare("email")}>
          <Mail className="h-4 w-4" />
          Email
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* QR Code */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <QrCode className="h-4 w-4" />
              QR Code
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>{getTypeIcon()}</span>
                {getTypeText()}
              </DialogTitle>
              <DialogDescription>Scan this QR code to share or access the link</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={fullUrl} size={200} level="M" includeMargin={true} />
              </div>
              {fullImageUrl && (
                <div className="text-center">
                  <img
                    src={fullImageUrl || "/placeholder.svg"}
                    alt={title}
                    className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                  <p className="text-sm text-muted-foreground">Preview image</p>
                </div>
              )}
              <div className="w-full space-y-2">
                <Label htmlFor="share-url">Link</Label>
                <div className="flex gap-2">
                  <Input id="share-url" value={fullUrl} readOnly className="flex-1" />
                  <Button size="sm" onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}