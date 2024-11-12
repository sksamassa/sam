"use client";

import Meeting from "@/app/(root)/meeting/[id]/page";
import MeetingCard from "@/components/MeetingCard";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording, Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "./Loader";

const CallList = ({ type }: { type: "upcoming" | "recordings" | "ended" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";
      case "recordings":
        return "No recordings";
      case "upcoming":
        return "No upcoming calls";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading)
    return <Loader />

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state.custom.description.substring(0, 20) ||
              "No description"
            }
            date={
              (meeting as Call).state.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={() => {
              type === "recordings"
                ? router.push(`${(meeting as CallRecording).url}`)
                : router.push(`meeting/${(meeting as Call).id}`);
            }}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
          />
        ))
      ) : (
        <h1 className="text-2xl leading-relaxed font-bold">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
