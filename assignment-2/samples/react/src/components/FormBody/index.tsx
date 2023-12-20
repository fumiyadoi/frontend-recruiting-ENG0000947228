import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "../../schema";
import { Button, Select, TextField } from "..";
import { FormButton } from "./components";
import { prefectures } from "../../utils";

interface Props {
  useFormReturn: UseFormReturn<UserSchemaType>;
}

interface RowProps {
  label: string;
  errorMsg?: string;
  children: React.ReactNode;
}

// 各入力項目のラベルと入力欄とエラーメッセージを表示するコンポーネント
function Row({ label, errorMsg, children }: RowProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="basis-1/4 text-end font-bold text-xs">{label}</div>
        <div className="grow">{children}</div>
      </div>
      {errorMsg && (
        <div className="flex items-start gap-3">
          <div className="basis-1/4"></div>
          <div className="grow text-start text-[#FB0000] text-[10px]">
            {errorMsg}
          </div>
        </div>
      )}
    </div>
  );
}

// フォームの入力項目と送信ボタンを表示するコンポーネント
function FormBody({ useFormReturn }: Props) {
  const {
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useFormReturn;

  return (
    <div className="w-[399px] h-[400px]">
      <div className="mt-4 mx-4 flex flex-col gap-4">
        <Row label="名前" errorMsg={errors.name?.message}>
          <TextField
            placeholder="(例)トレタ 太郎"
            register={register("name")}
            disabled={isSubmitting}
            required
          />
        </Row>
        <Row label="メールアドレス" errorMsg={errors.email?.message}>
          <TextField
            placeholder="(例)yoyaku@toreta.in"
            register={register("email")}
            disabled={isSubmitting}
            required
          />
        </Row>
        <Row label="郵便番号" errorMsg={errors.zip?.message}>
          <TextField
            placeholder="(例)0000000"
            register={register("zip")}
            disabled={isSubmitting}
            required
          />
        </Row>
        <Row label="都道府県" errorMsg={errors.prefecture?.message}>
          <Select
            value={watch("prefecture")}
            options={["", ...prefectures]}
            placeholder="都道府県を選択してください"
            register={register("prefecture")}
            disabled={isSubmitting}
            required
          />
        </Row>
        <Row label="市区町村・番地" errorMsg={errors.address1?.message}>
          <TextField
            placeholder="(例)品川区西五反田７丁目２２−１７"
            register={register("address1")}
            disabled={isSubmitting}
            required
          />
        </Row>
        <Row label="建物名・号室">
          <TextField
            placeholder="(例)TOCビル 8F"
            register={register("address2")}
            disabled={isSubmitting}
          />
        </Row>
      </div>
      <div className="flex justify-center mt-8">
        <FormButton useFormReturn={useFormReturn} />
      </div>
    </div>
  );
}

FormBody.displayName = "FormBody";

export default FormBody;
