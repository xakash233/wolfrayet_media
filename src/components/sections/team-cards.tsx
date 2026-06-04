"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface TeamCardsProps {
  members: TeamMember[];
}

export function TeamCards({ members }: TeamCardsProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="flex h-full w-full max-w-[300px] justify-center"
        >
          <Card className="flex h-full w-full flex-col overflow-hidden border-border/50 transition-shadow hover:shadow-xl">
            <div className="relative aspect-square w-full shrink-0 overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
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
      ))}
    </div>
  );
}
