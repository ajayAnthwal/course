export { DiscussionCard, DiscussionList } from "./components/discussion-list";
export { default as DiscussionsPage } from "./components/discussions-page";
export { discussionsService, type Discussion, type DiscussionAnswer, type CreateDiscussionDTO, type DiscussionsResponse } from "./services/discussions.service";
export { useDiscussions, useDiscussion, useCreateDiscussion, useAnswerDiscussion, useUpvoteAnswer, useAcceptAnswer } from "./hooks/useDiscussions";