export class Apartment {
  price!: number;
  location!: string;
  description !: string;
  owner!: { firstName: string, lastName: string };
  imageDownloadUrl!: string;
  userProfilePictureUrl!:string;
  ownerId!:string;
  constructor() {
  }
}
