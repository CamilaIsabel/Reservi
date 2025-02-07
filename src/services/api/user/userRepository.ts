import { UserDto } from '@/services/api/user/models';
import {
  allUsers,
  saveUser,
  deleteUserById,
  updateUser,
} from '@/assets/simulated-backend/backend';

export function getAllUsers(): Promise<UserDto[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allUsers());
    }, 1000); // Simulated Promise
  });
}

export function saveUserData(user: UserDto): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      saveUser(user);
      resolve();
    }, 2000);
  });
}

export function removeUserById(userId: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      deleteUserById(userId);
      resolve();
    }, 500);
  });
}

export function updateUserData(user: UserDto): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateUser(user);
      resolve();
    }, 2000);
  });
}
