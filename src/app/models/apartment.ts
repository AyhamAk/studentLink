export class Apartment {
  price!: number;
  location!: string;
  description !: string;
  owner!: { firstName: string, lastName: string ,Email:string | null | undefined};
  imageDownloadUrl!: string;
  userProfilePictureUrl!:string;
  ownerId!:string;
  constructor() {
  }
}
