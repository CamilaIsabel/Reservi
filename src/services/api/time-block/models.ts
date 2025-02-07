import { UserDto } from '@/services/api/user/models';

export interface TimeBlockWithUsers {
  id: number;
  startTime: Date | null;
  color: string;
  endTime: Date | null;
  users: UserDto[];
}

export interface TimeBlock {
  startTime: Date | null;
  endTime: Date | null;
  attachedUser: number | null;
}
