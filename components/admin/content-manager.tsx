"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ContentEditor } from "./content-editor"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, FileText, Globe, Calendar } from "lucide-react"

// Mock content data
const mockContent = [
  {
    id: "1",
    title: "About Us",
    slug: "about-us",
    type: "page",
    status: "published",
    author: "Admin User",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Summer Fashion Trends 2024",
    slug: "summer-fashion-trends-2024",
    type: "blog_post",
    status: "published",
    author: "Sarah Johnson",
    publishedAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    title: "New Collection Banner",
    slug: "new-collection-banner",
    type: "banner",
    status: "draft",
    author: "Mike Chen",
    publishedAt: null,
    updatedAt: "2024-01-19",
  },
]

export function ContentManager() {
  const [content, setContent] = useState(mockContent)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateContent = () => {
    setSelectedContent(null)
    setIsEditorOpen(true)
  }

  const handleEditContent = (contentItem: any) => {
    setSelectedContent(contentItem)
    setIsEditorOpen(true)
  }

  const handleDeleteContent = (contentId: string) => {
    setContent(content.filter((c) => c.id !== contentId))
  }

  const handleSaveContent = (contentData: any) => {
    if (selectedContent) {
      // Update existing content
      setContent(content.map((c) => (c.id === selectedContent.id ? { ...c, ...contentData } : c)))
    } else {
      // Create new content
      const newContent = {
        ...contentData,
        id: Date.now().toString(),
        author: "Current User",
        updatedAt: new Date().toISOString().split("T")[0],
      }
      setContent([newContent, ...content])
    }
    setIsEditorOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="default">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "page":
        return <Badge variant="outline">Page</Badge>
      case "blog_post":
        return <Badge variant="outline">Blog Post</Badge>
      case "banner":
        return <Badge variant="outline">Banner</Badge>
      case "announcement":
        return <Badge variant="outline">Announcement</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="text-muted-foreground">Manage pages, blog posts, and other content</p>
        </div>
        <Button onClick={handleCreateContent}>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Content</p>
                <p className="text-2xl font-bold">{content.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-2xl font-bold">{content.filter((c) => c.status === "published").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Draft</p>
                <p className="text-2xl font-bold">{content.filter((c) => c.status === "draft").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold">
                  {content.filter((c) => new Date(c.updatedAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content List</CardTitle>
              <CardDescription>Manage and organize your content</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">/{item.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.publishedAt ? item.publishedAt : "-"}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditContent(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteContent(item.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Content Editor Modal */}
      {isEditorOpen && (
        <ContentEditor content={selectedContent} onSave={handleSaveContent} onClose={() => setIsEditorOpen(false)} />
      )}
    </div>
  )
}
