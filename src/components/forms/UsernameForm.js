"use client";
import grabUsername from "@/actions/grabUsername";
import { redirect } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";


const UsernameForm = ({ desiredUsername }) => {

  const [taken, setTaken] = useState(false);

  async function handleSubmit(formData) {
    const result = await grabUsername(formData);
    setTaken(result === false);

    if (result) {
      redirect('/account?created=' + formData.get('username'));
    }
  }

  return (
    <div>
      <form action={handleSubmit}>
        <h1 className="text-4xl font-bold text-center mb-2">
          Grab your username
        </h1>
        <p className="text-center mb-6 text-gray-500">Choose your username</p>
        <div className="max-w-xs mx-auto">
          <input
            name="username"
            className="block p-2 mx-auto border w-full mb-2 text-center"
            defaultValue={desiredUsername}
            type="text"
            placeholder="username"
          />
          {taken && (
            <div className='bg-red-200 border border-red-500 p-2 mb-2'>
              Taken Username
            </div>
          )}
          <SubmitButton>
            Claim your Username
          </SubmitButton>
          {/* <button
            type="submit"
            className="bg-blue-500 disabled:bg-blue-300 text-white disabled:text-gray-200 py-2 px-4 block mx-auto w-full"
          >
            Claim Username
          </button> */}
          {/* At 2:42:00 some changes are been made. Which is not required but if it affects the code then we will change it. */}
        </div>
      </form>
    </div>
  );
};

export default UsernameForm;
