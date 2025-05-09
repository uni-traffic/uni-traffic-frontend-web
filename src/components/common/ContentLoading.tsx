import { RingLoader } from "react-spinners";

export const ContentLoading = () => {
  return (
    <div className="flex flex-col space-y-6 justify-center items-center w-full h-full border border-solid rounded-lg">
      <RingLoader />
    </div>
  );
};
