import { FolderX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/neuCampusBlurred.png')] bg-cover bg-center bg-no-repeat p-4">
      {/* Logo */}
      <div className="mb-8">
        <img src="/neu-logo.png" alt="Your Logo" className="h-20" />
      </div>

      {/* Icon */}
      <FolderX className="text-black w-24 h-24 mb-4 transform hover:scale-x-[-1] transition-transform duration-300 ease-in-out" />

      {/* Message */}
      <h1 className="text-4xl font-bold text-black mb-2">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      {/* Footer */}
      <footer className="absolute bottom-8 text-gray-700 text-sm">
        <p>
          &copy; 2025 Uni-Traffic. This is not an Official Website or Service of New Era University.
        </p>
      </footer>
    </div>
  );
}
