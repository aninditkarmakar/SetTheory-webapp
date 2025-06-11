"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface UserData {
  id: number
  name: string
  username: string
  email: string
}

interface ProfileEditFormProps {
  onCancel: () => void
  // Can add more properties later.
  initialUser: UserData
}

export function ProfileEditForm({
  onCancel,
  initialUser,
}: ProfileEditFormProps) {
  // Dummy form. Can handle using server actions as well maybe?
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Form submitted! (No actual data sent)")
    //
  }

  console.log("??? Initial Profile Data:", initialUser)

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
    >
      {/* Avatar stuff, not populating with existing for now.  */}
      <div className="md:col-span-1 flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile Image" />{" "}
          <AvatarFallback className="text-5xl">BB</AvatarFallback>{" "}
        </Avatar>
        <Button variant="outline">Update Image</Button>

        <div className="w-full space-y-2 pt-6">
          {" "}
          <Label htmlFor="link-f">Your Links</Label>
          <Input id="link-f" placeholder="Facebook" />
          <Input id="link-i" placeholder="Instagram" />
          <Input id="link-x" placeholder="X/twitter" />
          <Input id="link-s" placeholder="Soundcloud" />
        </div>
      </div>

      {/* Right Column: Profile Details */}
      <div className="md:col-span-1 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            placeholder="Display Name"
            value={initialUser.name}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="handle">Handle</Label>
          <Input
            id="handle"
            placeholder="Handle"
            value={initialUser.username}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="First Name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Last Name" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Country" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Bio" rows={4} />{" "}
          {/* Use Textarea for multi-line input */}
        </div>

        {/* Need to create separate component for tag selector */}

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" placeholder="Tags (e.g., Trance, Techno)" />
        </div>
      </div>

      <div className="md:col-span-2 flex justify-end space-x-2 pt-6">
        {" "}
        {/* Added padding top for separation */}
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}
