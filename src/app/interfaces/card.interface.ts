export interface CardInterface {
  id: string;
  uploaderAuthor: string;
  hotelName: string;
  hotelEmail: string;
  hotelNumber: string;
  hotelStar: string;
  hotelLocation: string;
  image: string[];
  rooms: string[];
  description: string;
  hotelServices: string
  reactionUserids: string[];
  uploadTime: string;
  tempUploadTime?: string;
}

