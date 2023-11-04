import { CreateCollageRequestDTO } from "./CreateCollageRequestDTO";

export interface IJobPayload {
  images: string[];
  properties: CreateCollageRequestDTO & {
    requestId: string;
  };
}