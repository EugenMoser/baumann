export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  actionSuccess?: boolean;
  message: string;
};
