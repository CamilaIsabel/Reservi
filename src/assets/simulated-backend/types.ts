export interface UserDto {
  id: number | null;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface TimeBlock {
  id: number;
  startTime: Date;
  endTime: Date;
  attachedUsers: number[];
  color?: string;
}
