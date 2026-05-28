"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LinkedinIcon, TwitterIcon } from "@/components/shared/social-icons";
import type { TeamMember } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface TeamCardsProps {
  members: TeamMember[];
}

export function TeamCards({ members }: TeamCardsProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card className="overflow-hidden border-border/50 transition-shadow hover:shadow-xl">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              <div className="mt-4 flex gap-2">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    aria-label={`${member.name} LinkedIn`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    aria-label={`${member.name} Twitter`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
