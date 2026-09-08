import type { Metadata } from "next";

import { FrameXApp } from "@/components/frame-x/frame-x-app";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "Frame X",
};

export default function FrameXPage() {
  return <FrameXApp />;
}
