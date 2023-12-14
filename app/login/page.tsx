import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className=" mx-auto h-full flex justify-center items-center">
          <div className="md:w-80 lg:w-96 bg-white">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
