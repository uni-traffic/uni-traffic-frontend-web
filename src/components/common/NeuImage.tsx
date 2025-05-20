import { useGetSignedUrl } from "@/hooks/file/useGetSignedUrl";
import { cn } from "@/lib/utils";
import { RingLoader } from "react-spinners";

export const NeuImage = ({
  image,
  cover,
  className,
  alt
}: { image: string; cover?: boolean; className?: string; alt: string }) => {
  const { data, isLoading } = useGetSignedUrl({
    path: image
  });

  return (
    <>
      {isLoading ? (
        <div className={cn("w-full h-[180px] flex justify-center items-center", className)}>
          <RingLoader />
        </div>
      ) : (
        <img
          src={data}
          alt={alt}
          className={cn("w-full h-[180px] object-contain cursor-pointer", className)}
          onClick={() => window.open(data, "_blank")}
          onKeyDown={() => window.open(data, "_blank")}
        />
      )}
    </>
  );
};
