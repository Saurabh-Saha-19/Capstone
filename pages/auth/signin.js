import Header from "@/components/Header";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div
        className="flex flex-col 
      items-center justify-center py-2
      mt-20 px-14 text-center"
      >
        <p className="font-greatVibes text-5xl md:text-8xl"> Creativegram </p>
        <div className="mt-10">
          {Object.values(providers).map((provider) => (
            <div key={providers.name}>
              <button
                className="font-montserrat p-3 bg-blue-500 text-white text-sm md:text-white md:text-xl rounded-full"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
        <div className="mx-10 my-10 md:my-20">
          <button className="font-montserrat p-3 bg-red-500 text-white text-sm md:text-white md:text-xl rounded-full">
            Read our terms of service
          </button>
        </div>
      </div>
    </>
  );
}

//Server Side
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;
