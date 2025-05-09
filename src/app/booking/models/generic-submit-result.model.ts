export type GenericSubmitResult =
  | { success: true; message: string }
  | { success: false; message: string };
