import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import React from "react"
import { Playlists } from "../components/Playlist"
import { Tracks } from "../components/Track"
import { Separator } from "@/components/ui/separator"
import ProfileInteraction from "./ProfileInteraction"

async function fetchUserData() {
  // Dummy API
  const userData = await fetch("https://jsonplaceholder.typicode.com/users/4")
  // Can specify cache: no=store to prevent caching and will force fetch on every req.
  const data = userData.json()
  return data
}

export default async function Profile() {
  // Sample data
  const pinnedPlaylistsData = [
    {
      id: "playlist-1",
      name: "Cool boys cuddle time tracks",
      tags: ["Trance", "Techno", "Hardstyle"],
    },
    {
      id: "playlist-2",
      name: "Chill Time with bros Tracks",
      tags: ["Trance", "Techno", "Hardstyle"],
    },
  ]

  const pinnedTracksData = [
    {
      id: "track-1",
      name: "Track #1 - Summer Vibes",
      tags: ["Trance", "Techno"],
    },
    {
      id: "track-2",
      name: "Track #2 - Night Drive",
      tags: ["Trance", "Techno"],
    },
    { id: "track-3", name: "Track #3 - Epic Breakdown", tags: ["Hardstyle"] },
  ]

  const user = await fetchUserData()
  console.log("User data in Profile component:", user)

  return (
    <div className="container mx-auto relative p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <div className="w-1/4 p-4 flex justify-center items-center">
          <Avatar className="w-32 h-32 ">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-3/4 p-4">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <h2 className="text-2xl">@{user.username}</h2>
          <h3 className="text-2xl">{user.email}</h3>
          <div className="pt-2 items-left gap-2 flex">
            <Badge variant="secondary">Trance</Badge>
            <Badge variant="secondary">Techno</Badge>
            <Badge variant="secondary">Hardstyle</Badge>
          </div>

          <div>
            {/* Client component because need user interactivity.  */}
            <ProfileInteraction initialUser={user} />
            {/* <Button>
              <Pencil />
              Edit Profile
            </Button> */}
          </div>
        </div>
      </div>
      <Separator />

      <div className="flex">
        <div className="w-1/4 p-4">
          <h2 className="text-2xl">Playlists</h2>
          <h2 className="text-2xl">Tracks</h2>
          <h2 className="text-2xl">Tags</h2>
        </div>

        <div className="w-3/4 p-4">
          <h2 className="text-2xl">Pinned Playlists</h2>
          <Playlists playlists={pinnedPlaylistsData} />
          <h2 className="text-2xl">Pinned Tracks</h2>
          <Tracks tracks={pinnedTracksData} />
        </div>
      </div>
    </div>
  )
}
