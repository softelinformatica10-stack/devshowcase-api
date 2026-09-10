export interface ProjectResponseDto {
  id: number;
  title: string;
  description: string | null;
  url: string;
  profileId: number;
  createdAt: Date;
}