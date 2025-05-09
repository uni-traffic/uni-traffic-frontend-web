"use client";

import { useLogInWithCredentials } from "@/hooks/auth/useLogInWithCredentials";
import { useLogOut } from "@/hooks/auth/useLogout";
import { useGoogleSignIn } from "@/hooks/auth/useSignInWithGoogle";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import type { User } from "@/lib/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signInWithGoogle: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { data: user, refetch: refetchUser, isFetching: isCurrentUserFetching } = useCurrentUser();
  const { mutate: authenticateWithGoogle, isPending: isGoogleSignInPending } = useGoogleSignIn();
  const { mutate: authenticateWithCredentials, isPending: isLogInPending } =
    useLogInWithCredentials();
  const { mutate: signOut, isPending: isLogOutPending } = useLogOut();

  const isLoading =
    isCurrentUserFetching || isGoogleSignInPending || isLogInPending || isLogOutPending;

  const signInWithGoogle = async (token: string) => {
    if (!token) {
      toast.error("Invalid Token");
      return;
    }

    authenticateWithGoogle(
      { token, clientType: "WEB" },
      {
        onSuccess: () => {
          refetchUser();
          router.replace("/dashboard");
          toast.success("Login Successful");
        },
        onError: (error) => {
          setError(error.message ?? "Internal Server Error");
        }
      }
    );
  };

  const login = async (username: string, password: string) => {
    if (username.length === 0 || password.length === 0) {
      setError("Provide username or password");
      return;
    }

    authenticateWithCredentials(
      {
        username,
        password
      },
      {
        onSuccess: () => {
          refetchUser();
          router.replace("/dashboard");
          toast.success("Login Successful");
        },
        onError: (error) => {
          setError(error.message ?? "Internal Server Error");
        }
      }
    );
  };

  const logout = async () => {
    signOut(null, {
      onSuccess: () => {
        setError(null);
        queryClient.clear();
        router.replace("/auth/login");
      },
      onError: (error) => {
        setError(error.message ?? "Internal Server Error");
      }
    });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <AuthContext.Provider value={{ user, login, signInWithGoogle, logout, error, isLoading }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
