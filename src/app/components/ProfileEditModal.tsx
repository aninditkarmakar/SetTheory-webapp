"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Need to learn better form handling.
import { ProfileEditForm } from "./ProfileEditForm";

interface UserData {
  user_id: string;
  first_name: string;
  email: string;
  username?: string;
}

interface ProfileEditModalProps {
  initialUser: UserData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ProfileEditModal({
  isOpen,
  onOpenChange,
  initialUser,
}: ProfileEditModalProps) {
  const handleCancel = () => {
    onOpenChange(false); // Close modal on cancel
  };

  console.log(">>>>> ProfileEditModal isOpen:", initialUser);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Change stuff</DialogDescription>
        </DialogHeader>

        <ProfileEditForm onCancel={handleCancel} initialUser={initialUser} />
      </DialogContent>
    </Dialog>
  );
}
