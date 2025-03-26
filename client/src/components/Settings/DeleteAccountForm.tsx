import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_USER } from "../../utils/api/user/mutations";
import Auth from "../../utils/auth";

interface DeleteAccountFormProps {
  onDelete?: () => void;
}

export default function DeleteAccountForm({
  onDelete,
}: DeleteAccountFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const client = useApolloClient();

  const [deleteUser, { loading }] = useMutation(DELETE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    try {
      const { data } = await deleteUser({
        variables: { password },
      });

      if (data?.deleteUser) {
        // Clear Apollo cache
        await client.resetStore();
        // Use the Auth service to properly logout
        Auth.logout();
        onDelete?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col">
      {!showPasswordForm ? (
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowPasswordForm(true)}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      ) : !isConfirming ? (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm your password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 cursor-pointer"
            >
              Continue to confirmation
            </button>
            <button
              type="button"
              onClick={() => setShowPasswordForm(false)}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Are you absolutely sure?
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, delete my account"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsConfirming(false);
                setShowPasswordForm(false);
              }}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </form>
  );
}
