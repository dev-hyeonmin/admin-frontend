import {useCustomMutation} from "@/api/query/useMutation.ts";
import {createPopups} from "@/api/endpoints/popup/index.ts";

export const useCreatePopup = () => {
  return useCustomMutation(createPopups, ["popups"], {
    onSuccess: () => {
      console.log("created successfully!");
    },
  });
};
