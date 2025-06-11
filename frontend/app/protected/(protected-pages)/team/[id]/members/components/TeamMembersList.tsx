"use client";
import { usePresence } from "@/components/presence-provider";
import Image from "next/image";

export default function TeamMembersList({ data, isLoading, error }: any) {
  const presence = usePresence();

  if (isLoading) return <div>Loading members...</div>;
  if (error) return <div>Error loading members.</div>;

  return (
    <div className="grid gap-4">
      {data.map((member) => (
        <div key={member.id} className="flex items-center gap-4">
          {member.avatarUrl ? (
            <Image
              src={member.avatarUrl}
              width={40}
              height={40}
              alt={member.name}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}
          <div>
            <p className="font-semibold">{member.name}</p>
            <p
              className={`text-sm ${
                presence.status[member.id] ? "text-green-600" : "text-gray-400"
              }`}
            >
              {presence.status[member.id] ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
