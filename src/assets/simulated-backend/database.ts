//Simulated Database

import { UserDto, TimeBlock } from '@/assets/simulated-backend/types';

export let users: UserDto[] = [
  {
    id: 1,
    name: 'Camila Lazaro',
    address: '123 Main St, Los Angeles, CA',
    phoneNumber: '+1 323-555-0123',
    email: 'camila.lazaro@example.com',
  },
  {
    id: 2,
    name: 'Lucas Perez',
    address: '456 Elm St, Miami, FL',
    phoneNumber: '+1 305-555-0456',
    email: 'lucas.goyeche@example.com',
  },
  {
    id: 3,
    name: 'Sofía Martínez',
    address: '789 Oak St, New York, NY',
    phoneNumber: '+1 212-555-0789',
    email: 'sofia.martinez@example.com',
  },
  {
    id: 4,
    name: 'Diego Ramírez',
    address: '321 Pine St, San Francisco, CA',
    phoneNumber: '+1 415-555-0321',
    email: 'diego.ramirez@example.com',
  },
  {
    id: 5,
    name: 'Valentina Herrera',
    address: '654 Maple St, Chicago, IL',
    phoneNumber: '+1 312-555-0654',
    email: 'valentina.herrera@example.com',
  },
];

export let timeBlocks: TimeBlock[] = [
  {
    id: 1,
    startTime: new Date('2025-02-09T09:00:00'),
    endTime: new Date('2025-02-10T10:00:00'),
    attachedUsers: [1],
    color: '#FF5733',
  },
  {
    id: 2,
    startTime: new Date('2025-02-11T11:00:00'),
    endTime: new Date('2025-02-12T12:00:00'),
    attachedUsers: [2],
    color: '#33FF57',
  },
  {
    id: 3,
    startTime: new Date('2025-02-13T14:00:00'),
    endTime: new Date('2025-02-14T15:30:00'),
    attachedUsers: [3],
    color: '#3357FF',
  },
  {
    id: 4,
    startTime: new Date('2025-02-15T16:00:00'),
    endTime: new Date('2025-02-16T17:45:00'),
    attachedUsers: [4],
    color: '#FF33A8',
  },
  {
    id: 5,
    startTime: new Date('2025-02-17T18:30:00'),
    endTime: new Date('2025-02-18T19:30:00'),
    attachedUsers: [5],
    color: '#FFD700',
  },
];
