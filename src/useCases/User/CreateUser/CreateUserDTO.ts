export interface CreateUserBodyDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserDTO {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}
