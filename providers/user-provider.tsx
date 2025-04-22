// app/providers/user-provider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { UserProfile } from "@/app/types/user"; // Verify this path matches your project structure
import { toast } from "@/components/ui/toast"; // Assuming you want toast notifications here too

// Define the shape of the user context
interface UserContextType {
  user: UserProfile | null;
  updateUser: (data: Partial<UserProfile>) => Promise<void>; // Function to update user data
  signOut: () => Promise<void>; // Function to sign the user out
  // Optional: if you need to force refresh user data from server
  // refreshUser: () => Promise<void>;
}

// Create the context with a default value that throws an error if used outside the provider
const UserContext = createContext<UserContextType | null>(null);

// Define the provider component
export function UserProvider({
  initialUser, // This likely comes from a server component parent
  children,
}: {
  initialUser: UserProfile | null;
  children: ReactNode;
}) {
  // Use useState to manage the user state within the provider
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  // Update user state when initialUser prop changes (e.g., on navigation)
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // --- Implement updateUser ---
  const updateUser = useCallback(async (data: Partial<UserProfile>) => {
    if (!user) {
      console.error("Cannot update user: No user logged in.");
      // Optionally throw an error or show a toast
      toast({ title: "Update failed: Not logged in", status: "error" });
      return;
    }

    console.log("Attempting to update user with:", data);

    try {
      // ******** TODO: Implement your API call here ********
      // Example using fetch:
      const response = await fetch("/api/user/update", { // ADJUST YOUR API ENDPOINT
        method: "PATCH", // or PUT/POST depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to get error details
        console.error("API Error updating user:", response.status, errorData);
        throw new Error(
          errorData.message || `Failed to update user (${response.status})`
        );
      }

      // Assuming the API returns the updated user profile or confirms success
      const updatedUserData = await response.json(); // Or handle success confirmation

      // Update local state optimistically or with returned data
      setUser((currentUser) =>
        currentUser
          ? { ...currentUser, ...data } // Simple optimistic update
          // Or if API returns full updated user:
          // { ...currentUser, ...updatedUserData }
          : null
      );

      console.log("User updated successfully.");
      toast({ title: "Settings updated", status: "success" });
      // Optionally, you could return the updated user if needed elsewhere
      // return updatedUserData;

    } catch (error) {
      console.error("Failed to update user:", error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        status: "error",
      });
      // Re-throw or handle as needed
      // throw error;
    }
  }, [user]); // Dependency: 'user' ensures we have the current user context for the API call logic


  // --- Implement signOut ---
  const signOut = useCallback(async () => {
    console.log("Attempting to sign out...");
    try {
      // ******** TODO: Implement your API call here ********
      // Example using fetch:
      const response = await fetch("/api/auth/signout", { // ADJUST YOUR API ENDPOINT
        method: "POST", // Or GET/DELETE depending on your API
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error signing out:", response.status, errorData);
        throw new Error(errorData.message || `Sign out failed (${response.status})`);
      }

      // Clear local user state
      setUser(null);
      console.log("User signed out successfully.");
      // Toast message might be better placed in the component calling signOut,
      // after other cleanup (like clearing IndexedDB) is done.

    } catch (error) {
      console.error("Sign out failed:", error);
      toast({
        title: "Sign Out Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        status: "error",
      });
      // Re-throw the error so the calling component knows it failed
      throw error;
    }
  }, []); // No dependencies needed for sign out typically

  // Provide the user state and the action functions through the context
  const contextValue = {
    user,
    updateUser,
    signOut,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Define the custom hook to consume the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    // This error means you're trying to use `useUser` outside of a component
    // wrapped in `<UserProvider>`. Check your component tree.
    throw new Error("useUser must be used within a UserProvider");
  }
  return context; // Return the full context object { user, updateUser, signOut }
}