import { fetchAuthSession, JWT, signOut } from "aws-amplify/auth";
import { Form, useForm } from "react-hook-form";
import { API_URL } from "../lib/data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Formdata = {
  name: string;
  quote: string;
};

export default function Dashboard() {
  const { register, control, reset } = useForm<Formdata>();
  const [token, setToken] = useState<JWT | undefined>();

  useEffect(() => {
    async function checkToken() {
      try {
        const session = await fetchAuthSession();
        setToken(session.tokens?.idToken);
      } catch (error) {
        console.error("Failed to retrieve token:", error);
      }
    }
    checkToken();
  }, []);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <>
      <header className="flex justify-end items-center gap-6">
        <Link to="/" className="p-2 px-4 bg-gray-600 text-white rounded">
          Home
        </Link>
        <button type="button" onClick={handleSignOut} className="p-2 bg-gray-600 text-white rounded">
          Sign out
        </button>
      </header>
      <div className="flex justify-center">
        <Form
          className="flex flex-col items-center "
          action={`${API_URL}/quote`} // Send post request with the FormData
          headers={{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }}
          onSuccess={() => {
            reset();
            alert("Quote added successfully");
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
    </>
  );
}
