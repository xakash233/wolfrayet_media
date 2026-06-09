"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { useScrollReveal } from "@/components/shared/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const reveal = useScrollReveal({ index, duration: 1.3 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      whileHover={{ y: -6 }}
      className="flex h-full w-full max-w-[300px] justify-center"
    >
      <Card className="flex h-full w-full flex-col overflow-hidden border-border/50 transition-shadow hover:shadow-xl">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        </div>
        <CardContent className="flex flex-1 flex-col p-6 text-center">
          <h3 className="font-bold">{member.name}</h3>
          <p className="text-sm text-primary">{member.role}</p>
          <p className="mt-2 min-h-[5.5rem] flex-1 text-sm leading-relaxed text-muted-foreground">
            {member.bio}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface TeamCardsProps {
  members: TeamMember[];
}

export function TeamCards({ members }: TeamCardsProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <TeamCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );
}
