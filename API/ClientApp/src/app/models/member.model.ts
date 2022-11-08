import { Photo } from "./photo.model";


export interface Member {
  id: number;
  userName: string;
  photoUrl: string;
  registeredAt: Date;
  lastActive: Date;
  age: number;
  knownAs: string;
  photos: Photo[];
  gender: string;
  interests: string;
  lookingFor: string;
  introduction: string;
  city: string;
  country: string;
}

