import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full h-[10vh] bg-white flex px-10 justify-between min-w-[500px] shadow-sm sticky top-0 z-50 font-sans">
      <div className="h-full flex justify-center items-center py-2">
        <Link href="/">
          <div className="hover:animate-pulse">
            <img
              src="/neu-logo.png"
              alt="NEU Logo"
              className="w-[60px] h-[60px] transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-x-8">
        <Link
          className="text-[18px] font-medium text-gray-800 hover:text-[#4ab535]
                      relative after:content-[''] after:absolute after:w-0 after:h-[2px]
                      after:bg-[#4ab535] after:bottom-0 after:left-0 hover:after:w-full
                      after:transition-all after:duration-300 transition-colors duration-300"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-[18px] font-medium text-gray-800 hover:text-[#4ab535]
                      relative after:content-[''] after:absolute after:w-0 after:h-[2px]
                      after:bg-[#4ab535] after:bottom-0 after:left-0 hover:after:w-full
                      after:transition-all after:duration-300 transition-colors duration-300"
          href="/download"
        >
          Download
        </Link>
        <Link
          className="text-[18px] font-medium text-gray-800 hover:text-[#4ab535]
                      relative after:content-[''] after:absolute after:w-0 after:h-[2px]
                      after:bg-[#4ab535] after:bottom-0 after:left-0 hover:after:w-full
                      after:transition-all after:duration-300 transition-colors duration-300"
          href="/auth/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
