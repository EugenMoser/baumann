export type FormPasswordStates = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  actionSuccess?: boolean;
  message: string;
};

export type FormFieldErrors = {
  category?: string[];
  productPrio?: string[];
  productName?: string[];
  descriptionProduct1?: string[];
  descriptionProduct2?: string[];
  descriptionProduct3?: string[];
  descriptionProduct4?: string[];
  material?: string[];
  imageSmall?: string[];
};

export type ProductNotificationFormStates = {
  errors?: FormFieldErrors; // field specific errors
  globalError?: string; // global error message
  message?: string; // success or info message
  success?: boolean;
};

export type ImageUploadState = ProductNotificationFormStates & {
  url?: string; // URL of the uploaded image
};
