import { Hobby, UserHobby } from './model';

export const hobbies: Hobby[] = [
  { id: '589b30d9-abb7-4c1a-a5de-97d50d740ae2', name: 'Quidditch' },
  { id: '33f92b40-d44a-4c8e-80a2-f3d222f1e27e', name: 'Potion Making' },
  { id: '973a3d7a-5c35-4895-8435-448a9d31d0b9', name: 'Chess' },
  { id: '2b98de45-cc58-44f6-b513-c86525a2c214', name: 'Transfiguration' },
  { id: 'ba3e3b54-1c71-4c29-98b0-8a7a9f25aaf5', name: 'Herbology' },
];

export const usersHobbies: UserHobby[] = [
  { userId: 'b2502e61-5557-408a-b39d-e4abe7c000d7', hobbyId: '589b30d9-abb7-4c1a-a5de-97d50d740ae2' },
  { userId: 'b2502e61-5557-408a-b39d-e4abe7c000d7', hobbyId: '33f92b40-d44a-4c8e-80a2-f3d222f1e27e' },
  { userId: 'c5d28d3c-5057-4f5c-88b4-f0d99c5b7a2d', hobbyId: '33f92b40-d44a-4c8e-80a2-f3d222f1e27e' },
  { userId: 'c5d28d3c-5057-4f5c-88b4-f0d99c5b7a2d', hobbyId: '2b98de45-cc58-44f6-b513-c86525a2c214' },
  { userId: 'e4a9b996-6d12-4f2b-8966-95e6a1ac1446', hobbyId: '589b30d9-abb7-4c1a-a5de-97d50d740ae2' },
  { userId: 'e4a9b996-6d12-4f2b-8966-95e6a1ac1446', hobbyId: 'ba3e3b54-1c71-4c29-98b0-8a7a9f25aaf5' },
];
