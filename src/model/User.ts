export default interface User {
  uid: string;
  email: string | null;
  name: string | null;
  token: string;
  provider: string;
  imageUrl: string | null;
}
