import React from "react";
import { useApolloClient } from "@apollo/client";
import { UPDATE_USER } from "../utils/api/user/mutations";

interface ChangePasswordFormProps {
  onSubmit?: (data: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => void;
}

export default function ChangePasswordForm({
  onSubmit,
}: ChangePasswordFormProps) {
  const client = useApolloClient();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      current_password: formData.get("current_password") as string,
      new_password: formData.get("new_password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };

    if (data.new_password !== data.confirm_password) {
      setError(new Error("New passwords do not match"));
      setLoading(false);
      return;
    }

    try {
      await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          input: {
            password: data.new_password,
            currentPassword: data.current_password,
          },
        },
      });
      onSubmit?.(data);
    } catch (err) {
      setError(err as Error);
      console.error("Error updating password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2">
      {error && (
        <div className="mb-4 text-red-600 text-sm">{error.message}</div>
      )}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="current-password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Current password
          </label>
          <div className="mt-2">
            <input
              id="current-password"
              name="current_password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="new-password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            New password
          </label>
          <div className="mt-2">
            <input
              id="new-password"
              name="new_password"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="confirm-password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Confirm password
          </label>
          <div className="mt-2">
            <input
              id="confirm-password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
