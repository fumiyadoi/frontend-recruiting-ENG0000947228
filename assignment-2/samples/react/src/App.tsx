import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { UserSchemaType, userSchema } from "./schema";
import { FormBody } from "./components";

function App() {
  const useFormReturn = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
  });
  const { handleSubmit } = useFormReturn;

  const onSubmit = async (data: UserSchemaType) => {
    console.log(data);
    // https://httpstat.us/201 に対してPOSTリクエストを送信してください。
    // リクエストのボディには以下の形式で送信してください。
    // {
    //       name: "トレタ太郎",
    //       email: "yoyaku@toreta.in",
    //       zip: "0000000";
    //       prefecture: "東京都";
    //       address1: "品川区西五反田7丁目22-17";
    //       address2: "TOCビル8F";
    // }
    await fetch("https://httpstat.us/201", {
      method: "POST",
      body: JSON.stringify(data),
    });
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
