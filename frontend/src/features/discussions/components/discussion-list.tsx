"use client";

import Link from "next/link";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import type { Discussion } from "../services/discussions.service";

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Link href={`/discussions/${discussion._id}`}>
      <Card hover className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {discussion.isResolved && (
                  <Badge variant="success" size="sm">Resolved</Badge>
                )}
                {discussion.college && (
                  <Badge variant="secondary" size="sm">{discussion.college.name}</Badge>
                )}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600">
                {discussion.title}
              </h3>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                {discussion.content}
              </p>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span>👤 {discussion.author.name}</span>
                <span>👁️ {discussion.views}</span>
                <span>💬 {discussion.answers} answers</span>
                <span>{new Date(discussion.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface DiscussionListProps {
  discussions: Discussion[];
  showCollege?: boolean;
}

export function DiscussionList({ discussions, showCollege = true }: DiscussionListProps) {
  if (discussions.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        <p className="text-lg mb-2">No discussions yet</p>
        <p className="text-sm">Be the first to start a discussion!</p>
      </div>
    );
  }

  return (
    <div>
      {discussions.map((discussion) => (
        <DiscussionCard key={discussion._id} discussion={discussion} />
      ))}
    </div>
  );
}