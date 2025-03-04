import { signOut } from "aws-amplify/auth";
import { Form, useForm } from "react-hook-form";
import { API_URL } from "../lib/data";

type Formdata = {
  name: string;
  quote: string;
};

export default function Dashboard() {
  const { register, control } = useForm<Formdata>();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="grid">
      <header className="flex justify-end">
        <button type="button" onClick={handleSignOut} className="p-2 bg-gray-600 text-white rounded">
          Sign out
        </button>
      </header>
      <div className="flex justify-center">
        <Form
          className="flex flex-col items-center "
          action={`${API_URL}/quote`} // Send post request with the FormData
          headers={{
            accessToken:
              "eyJraWQiOiJ0T2dZWndEdEI3clU0bzFWY3FyRTIremNlTU1IUmUrZHlEVElUVzdtV0NBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNGY4YzRiOC00MDcxLTcwNGUtNmRlZC0yYTg2MTE4ZmU4ZGEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9jZjJPZENabG8iLCJjbGllbnRfaWQiOiIxazhpc3VkczVibTlxZWI1MzVtdHRiMzZlYyIsIm9yaWdpbl9qdGkiOiJiNjhjODFkMS1kNDBhLTQyZWItYmZjNy0yNmRmYmU2ZGJmYmQiLCJldmVudF9pZCI6IjM5MTJlYzRlLWI3NDQtNGRjZi05MTU1LWUyOTU2M2MzYTZlMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NDExMjc1MjQsImV4cCI6MTc0MTEzMTEyNCwiaWF0IjoxNzQxMTI3NTI0LCJqdGkiOiI2NjRmMGY3MC1hZThkLTQ2OGQtODljNC1kOTFiZmVkMTRjMzAiLCJ1c2VybmFtZSI6InRlY2htYXRsb2NrIn0.OmelCmc3s7Eu0DOUHzmWK3IbtToVthsslBntR98ByDAXasriSa5zeneJKwUtJ3URaQyZhg3APvqnDsOq4CqbNIn9ur9QKoUyUfZgOhrzbtBlNhk7aGwm6m5W38UjLu7kXJDiWYeeHT7uq7ZwpLI5sjCMWv0hJBUiZ4TyvxV3IgMYTxx6ahE-n3qWBHgPOvMbPZ-xYLbaeq_zv99u7LDmv4ETCEy2rPQpLWOkUvfs3oCU-1QVT3SWK91MXMTx3fzqGZXu3chl_c-Ry0GZaFYzKit5s6Q1226QxhDK3kKo8D8rqgJqdSoo8p1ATu7zmtl55OgQZcATJ2Dco-nlhu5zFQ",
            "Content-Type": "application/json",
          }}
          onSuccess={() => {
            alert("Your application is updated.");
          }}
          onError={() => {
            alert("Submission has failed.");
          }}
          control={control}
        >
          <label>Name</label>
          <input {...register("name", { required: true })} className="border border-gray-600 rounded p-2 h-8 w-full mb-2" />
          <label>Qoute</label>
          <input {...register("quote", { required: true })} className="border border-gray-600 rounded p-2 h-8 w-full mb-2" />
          <button className="p-2 bg-gray-600 text-white rounded">Submit</button>
        </Form>
      </div>
    </div>
  );
}
