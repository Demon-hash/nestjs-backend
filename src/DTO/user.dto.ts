export type Role = "User" | "Moderator" | "Admin";

export interface JWTTokens {
    readonly access_token: string;
    readonly refresh_token: string;
}

export interface User {
   id: string | undefined;
   firstName: string | undefined;
   lastName: string | undefined;
   email: string | undefined;
   role: Role | undefined;
}

export interface UserDto extends User {
    password: string | undefined;
}
