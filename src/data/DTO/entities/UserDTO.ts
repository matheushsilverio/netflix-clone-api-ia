export interface UserDTO {
  id?: number;
  name?: string;
}

export interface UserQueryResponse {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
