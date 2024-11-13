"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-x-4">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px]">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId as string);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId as string);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  if (!user || !meetingId || !meetingLink) return null; // Ensures prerendering doesn't trigger before data is available

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting's ID" description={meetingId as string} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-1"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);

            toast({
              title: "Link copied",
              className: "bg-dark-1 border-none",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
