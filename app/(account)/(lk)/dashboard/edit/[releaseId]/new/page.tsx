"use client";

import EditNewTrack from "@/widgets/UpdateRelize/EditNewTrack/EditNewTrack";

export default function addTrack({
  params,
}: {
  params: { releaseId: string };
}) {
  return <EditNewTrack />;
}
