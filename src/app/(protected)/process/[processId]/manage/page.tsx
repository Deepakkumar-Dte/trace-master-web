"use client";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ProcessManage = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div>
      <Button onClick={() => router.push(`${path}/node`)}>Manage Nodes</Button>
    </div>
  );
};

export default ProcessManage;
