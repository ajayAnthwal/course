import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: documentsService.getDocuments,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => documentsService.uploadDocument(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}