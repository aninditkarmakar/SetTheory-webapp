"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ProfileEditModal } from "../components/ProfileEditModal";

// Temp for now. and move to types later
interface UserData {
  user_id: string;
  first_name: string;
  email: string;
  username?: string;
}

interface ProfileInteractionProps {
  initialUser: UserData; // This is the current users data.
}

export default function ProfileInteraction({
  initialUser,
}: ProfileInteractionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser] = useState<UserData>(initialUser);

  console.log("Current user in ProfileInteraction:", currentUser);

  // Need to handle actual POST here or using server actions.
  //   const handleProfileUpdated = (updatedData: UserData) => {
  //     setCurrentUser(updatedData) //
  //     setIsModalOpen(false) //
  //
  //   }

  return (
    <div>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" />
          {/* Added margin to the icon for better spacing */}
          Edit Profile
        </Button>
      </div>

      <ProfileEditModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialUser={currentUser}
        // onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
}
