import useAuthFirebase from "@/hook/useAuthFirebase";

interface AvatarUserProps {
  className?: string;
}

export default function AvatarUser({ className }: AvatarUserProps) {
  const { user } = useAuthFirebase();

  return (
    <div>
      <img
        src={user?.imageUrl ?? "/images/avatar.svg"}
        alt="Avatar User Root"
        
        
        className={`
          h-6 w-6 rounded-full
          ${className}
      `}

      />
    </div>
  );
}
