export interface Note {
    _id: string;
    userId: string;
    title: string;
    content: string;
    type: 'text' | 'audio';
    favorite: boolean;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface User {
    _id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }