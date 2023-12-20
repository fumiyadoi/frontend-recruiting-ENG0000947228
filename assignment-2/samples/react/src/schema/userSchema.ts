import { z } from "zod";

// ユーザー情報のスキーマ
export const userSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください。" }),
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "正しいメールアドレスを入力してください" }),
  zip: z
    .string()
    .min(1, { message: "郵便番号を入力してください。" })
    .refine((value) => (value ? /^\d{7}$/.test(value) : true), {
      message: "ハイフンを含めず半角数字で入力してください",
    }),
  prefecture: z.string().min(1, { message: "都道府県を選択してください。" }),
  address1: z
    .string()
    .min(1, { message: "市区町村・番地を入力してください。" }),
  address2: z.string().optional(),
});

// ユーザー情報のスキーマの型
export type UserSchemaType = z.infer<typeof userSchema>;
