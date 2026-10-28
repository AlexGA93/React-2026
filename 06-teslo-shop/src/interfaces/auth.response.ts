import type { User } from "./user.response";

// Login, Register, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}
