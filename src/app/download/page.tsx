"use client";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowDown, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const fileData = {
  downloadUrl:
    "https://github.com/uni-traffic/uni-traffic-frontend-mobile/releases/download/uni-traffic-mobile-android/uni-traffic-mobile-v1.0.0.apk",
  size: "92.1 MB",
  version: "v1.0.0"
};

const DownloadPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    toast.success("Download started!", {
      description: "Your download should begin automatically.",
      duration: 5000
    });

    setTimeout(() => {
      window.location.href = fileData.downloadUrl;
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-[url('/neuCampusBlurred.png')] overflow-hidden bg-cover bg-center bg-no-repeat ] py-12 px-4">
        <div className="max-w-4xl w-full animate-fade-in">
          <Card className="w-full overflow-hidden border-none shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-r from-[#4ab535] to-[#35b560] text-white p-8 flex flex-col justify-center transition-all duration-500 hover:from-[#35b560] hover:to-[#4ab535]">
                <h1 className="text-3xl font-bold mb-4">UniTraffic</h1>
                <h2 className="text-xl font-semibold mb-8">
                  Mobile Application {fileData.version}
                </h2>
                <p className="mb-6">
                  Get access to our powerful vehicle management tools directly on your Android
                  device.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2" />
                    <span>View vehicle records on the go</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2" />
                    <span>Issue violations anywhere</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2" />
                    <span>Check the status of vehicle application instantly</span>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/2 p-8 flex flex-col justify-center items-center bg-white">
                <div className="mb-8 text-center">
                  <CardTitle className="text-2xl mb-3">Download Now</CardTitle>
                  <CardDescription>
                    For Android devices only. Requires Android 7.0 or higher.
                  </CardDescription>
                </div>

                <div className="w-full flex justify-center mb-8">
                  <div
                    className={`relative transition-all duration-300 ${isDownloading ? "scale-95" : "hover:scale-105"}`}
                  >
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r from-[#4ab535] to-[#35b560] hover:from-[#35b560] hover:to-[#4ab535] text-white px-20 py-3 text-lg h-auto transition-all duration-300 ${isDownloading ? "animate-pulse" : ""}`}
                      onClick={handleDownload}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <ArrowDown className="mr-2 h-6 w-6 animate-bounce" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-6 w-6" />
                          Download
                        </>
                      )}
                    </Button>

                    <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500">
                      {fileData.version} • {fileData.size}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-center text-gray-500 mt-6">
                  <p>By downloading, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;
