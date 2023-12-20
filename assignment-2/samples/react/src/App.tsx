import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { UserSchemaType, userSchema } from "./schema";
import { FormBody } from "./components";

function App() {
  // フォームの状態を管理する
  const useFormReturn = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
  });
  const { handleSubmit } = useFormReturn;

  // フォームの送信ボタンが押された時の処理
  const onSubmit = async (data: UserSchemaType) => {
    try {
      await fetch("https://httpstat.us/201", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error(e);
      window.alert("エラーが発生しました");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBody useFormReturn={useFormReturn} />
      </form>
    </div>
  );
}

export default App;
