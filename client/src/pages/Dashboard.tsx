import { fetchAuthSession, JWT, signOut } from "aws-amplify/auth";
import { Form, useForm } from "react-hook-form";
import { API_URL } from "../lib/data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer position="top-center" />
      <header className="flex items-center sm:justify-center sm:mb-10 lg:justify-end lg:mr-20 gap-12 pt-6">
        <Link to="/">Home</Link>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </header>
      <div className="flex justify-center mt-36">
        <Form
          className="flex flex-col items-center w-4/12 p-4 outline outline-2 outline-gray-200 outline-offset-8"
          action={`${API_URL}/quote`} // Send post request with the FormData
          headers={{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }}
          onSuccess={() => {
            reset();
            toast.success("Quote added successfully.");
          }}
          onError={() => {
            toast.error("Submission has failed.");
          }}
          control={control}
        >
          <label>Name</label>
          <input {...register("name", { required: true })} className="h-8 w-full mt-2 pl-2 border border-gray-600 rounded" />
          <label className="mt-2">Qoute</label>
          <input {...register("quote", { required: true })} className="h-8 w-full mt-2 pl-2 border border-gray-600 rounded" />
          <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-slate-50 font-medium rounded">Submit</button>
        </Form>
      </div>
    </>
  );
}
