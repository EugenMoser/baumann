export type FormPasswordStates = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  actionSuccess?: boolean;
  message: string;
};
