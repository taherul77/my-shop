import React from "react";
import MiniLoader from "./MiniLoader";

const FormSubmitButton = ({
  status,
  buttonName,
  context,
}: {
  status: string;
  buttonName: string;
  context: string;
}) => {
  return (
    <button
      type="submit"
      className="w-full bg-black text-white dark:text-white py-2 px-4 rounded-md hover:bg-primary-dark  focus:outline-none flex items-center justify-center mb-10"
    >
      {status === "pending" ? (
        <>
          <MiniLoader />
          <span className="ml-2">{context}</span>
        </>
      ) : (
        <>{buttonName}</>
      )}
    </button>
  );
};

export default FormSubmitButton;
