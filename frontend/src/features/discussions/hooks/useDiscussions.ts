import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { discussionsService, type Discussion, type DiscussionAnswer, type CreateDiscussionDTO } from "../services/discussions.service";

export function useDiscussions(params?: {
  collegeId?: string;
  course?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["discussions", params],
    queryFn: () => discussionsService.getDiscussions(params),
  });
}

export function useDiscussion(id: string) {
  return useQuery({
    queryKey: ["discussion", id],
    queryFn: () => discussionsService.getDiscussion(id),
    enabled: !!id,
  });
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDiscussionDTO) => discussionsService.createDiscussion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
}

export function useAnswerDiscussion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ discussionId, content }: { discussionId: string; content: string }) =>
      discussionsService.answerDiscussion(discussionId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["discussion", variables.discussionId] });
    },
  });
}

export function useUpvoteAnswer() {
  return useMutation({
    mutationFn: (answerId: string) => discussionsService.upvoteAnswer(answerId),
  });
}

export function useAcceptAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answerId: string) => discussionsService.acceptAnswer(answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
}