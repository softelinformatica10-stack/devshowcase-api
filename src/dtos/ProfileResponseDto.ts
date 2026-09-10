export interface ProfileResponseDto {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  createdAt: Date;
}