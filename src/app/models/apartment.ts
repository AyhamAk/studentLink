export class Apartment {
  price!: number;
  location!: string;
  description !: string;
  owner!: { firstName: string, lastName: string };
  imageUrl!:  string | ArrayBuffer | null;

  constructor() {
  }
}
