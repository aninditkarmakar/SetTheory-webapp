import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Move to types .
interface TrackItem {
  id: string
  name: string
  tags: string[]
}

interface TrackProps {
  tracks: TrackItem[]
}

export function Tracks({ tracks }: TrackProps) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {tracks.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center">
            No pinned tracks to display yet.
          </p>
        ) : (
          tracks.map((track) => (
            <Card key={track.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{track.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag, tagIndex) => (
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
