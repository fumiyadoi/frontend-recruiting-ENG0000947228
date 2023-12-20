import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "../../../../schema";
import { Button } from "../../..";

interface Props {
  useFormReturn: UseFormReturn<UserSchemaType>;
}

function FormButton({ useFormReturn }: Props) {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormReturn;

  // 入力項目が建物名・号室を除き全て入力されているかどうかを判定する
  const isValid =
    watch("name")?.length &&
    watch("email")?.length &&
    watch("zip")?.length &&
    watch("prefecture")?.length &&
    watch("address1")?.length;

  return (
    <div className="w-[100px]">
      <Button type="submit" disabled={!isValid || isSubmitting}>
        登録
      </Button>
    </div>
  );
}

FormButton.displayName = "FormButton";

export default FormButton;
