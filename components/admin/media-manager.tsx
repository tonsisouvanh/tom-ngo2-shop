"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import { Upload, Search, Grid3X3, List, ImageIcon, Video, File, Folder, Download, Trash2 } from "lucide-react"

// Mock media data
const mockMedia = [
  {
    id: "1",
    filename: "summer-collection-hero.jpg",
    originalName: "Summer Collection Hero Image.jpg",
    url: "/placeholder.svg?height=200&width=300&text=Hero+Image",
    thumbnailUrl: "/placeholder.svg?height=100&width=150&text=Hero+Thumb",
    size: 2048576,
    mimeType: "image/jpeg",
    alt: "Summer collection hero image",
    caption: "Main banner for summer collection",
    folder: "banners",
    uploadedAt: "2024-01-20T10:30:00Z",
    uploadedBy: "Sarah Johnson",
  },
  {
    id: "2",
    filename: "product-tshirt-001.jpg",
    originalName: "Classic Cotton T-Shirt.jpg",
    url: "/placeholder.svg?height=200&width=200&text=T-Shirt",
    thumbnailUrl: "/placeholder.svg?height=100&width=100&text=T-Shirt+Thumb",
    size: 1536000,
    mimeType: "image/jpeg",
    alt: "Classic cotton t-shirt",
    caption: "",
    folder: "products",
    uploadedAt: "2024-01-19T14:15:00Z",
    uploadedBy: "Mike Chen",
  },
  {
    id: "3",
    filename: "fashion-video-2024.mp4",
    originalName: "Fashion Lookbook 2024.mp4",
    url: "/placeholder.svg?height=200&width=300&text=Video+File",
    thumbnailUrl: "/placeholder.svg?height=100&width=150&text=Video+Thumb",
    size: 15728640,
    mimeType: "video/mp4",
    alt: "Fashion lookbook video 2024",
    caption: "Spring/Summer 2024 lookbook video",
    folder: "videos",
    uploadedAt: "2024-01-18T09:45:00Z",
    uploadedBy: "Emma Davis",
  },
]

const folders = [
  { name: "All Files", count: mockMedia.length },
  { name: "banners", count: 1 },
  { name: "products", count: 1 },
  { name: "videos", count: 1 },
]

export function MediaManager() {
  const [media, setMedia] = useState(mockMedia)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("All Files")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === "All Files" || item.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleDeleteSelected = () => {
    setMedia(media.filter((item) => !selectedFiles.includes(item.id)))
    setSelectedFiles([])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (mimeType.startsWith("video/")) return <Video className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and other media files</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Files</p>
                <p className="text-2xl font-bold">{media.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Images</p>
                <p className="text-2xl font-bold">{media.filter((m) => m.mimeType.startsWith("image/")).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Videos</p>
                <p className="text-2xl font-bold">{media.filter((m) => m.mimeType.startsWith("video/")).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Storage Used</p>
                <p className="text-2xl font-bold">
                  {formatFileSize(media.reduce((total, item) => total + item.size, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Files</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={[]}
                onImagesChange={(newImages) => {
                  const mediaFiles = newImages.map((img) => ({
                    ...img,
                    folder: "uploads",
                    uploadedBy: "Current User",
                  }))
                  setMedia([...mediaFiles, ...media])
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedFolder === folder.name ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Folder className="h-4 w-4" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="images">Images</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{selectedFiles.length} selected</span>
                    <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Media Grid/List */}
          <Card>
            <CardContent className="p-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMedia.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-colors ${
                        selectedFiles.includes(item.id) ? "border-primary" : "border-transparent hover:border-border"
                      }`}
                      onClick={() => handleFileSelect(item.id)}
                    >
                      <div className="aspect-square relative">
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.alt || item.filename}
                          className="w-full h-full object-cover"
                        />

                        {/* File type indicator */}
                        <div className="absolute top-2 left-2">
                          <div className="bg-black/50 text-white p-1 rounded">{getFileIcon(item.mimeType)}</div>
                        </div>

                        {/* Selection indicator */}
                        {selectedFiles.includes(item.id) && (
                          <div className="absolute top-2 right-2">
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" variant="secondary">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{item.filename}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedFiles.includes(item.id) ? "bg-primary/10 border border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => handleFileSelect(item.id)}
                    >
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.alt || item.filename}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.filename}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(item.size)} • {item.folder} • {item.uploadedBy}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getFileIcon(item.mimeType)}
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
