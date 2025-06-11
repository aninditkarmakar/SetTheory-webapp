import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Move to types .
interface PlaylistItem {
  id: string
  name: string
  tags: string[]
}

interface PlaylistsProps {
  playlists: PlaylistItem[]
}

export function Playlists({ playlists }: PlaylistsProps) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {playlists.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center">
            No pinned playlists to display yet.
          </p>
        ) : (
          playlists.map((playlist) => (
            <Card key={playlist.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {playlist.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
