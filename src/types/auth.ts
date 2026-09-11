import { z } from 'zod';
import {
  LoginSchema,
  AcceptInviteSchema,
  AcceptInviteFormSchema,
  UserRoleSchema,
  UserSchema,
  GetInviteResponseSchema,
  AcceptInviteResponseSchema,
  LoginResponseSchema,
  AuthUserResponseSchema,
  LogoutResponseSchema
} from '../schemas/auth';

export type LoginPayload = z.infer<typeof LoginSchema>;
export type AcceptInvitePayload = z.infer<typeof AcceptInviteSchema>;
export type AcceptInviteFormValues = z.infer<typeof AcceptInviteFormSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type GetInviteResponse = z.infer<typeof GetInviteResponseSchema>;
export type AcceptInviteResponse = z.infer<typeof AcceptInviteResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
