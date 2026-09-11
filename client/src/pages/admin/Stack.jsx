import { useEffect, useState } from "react";
import StackForm from "../../components/admin/StackForm";
import {
  getStack,
  updateStack,
} from "../../services/stackService";

const emptyStack = {
  frontend: {
    categoryName: "Frontend",
    tools: "",
  },
  backend: {
    categoryName: "Backend",
    tools: "",
  },
  database: {
    categoryName: "Database",
    tools: "",
  },
  tools: {
    categoryName: "Tools",
    tools: "",
  },
};

const Stack = () => {
  const [stack, setStack] = useState(emptyStack);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStack = async () => {
      try {
        const data = await getStack();

        setStack(data);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message ||
              "Failed to load stack."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadStack();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await updateStack(data);

      setStack(response.stack);

      setMessage("Stack updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update stack."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-xs font-mono text-gray-600">
          LOADING STACK...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-6xl">
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
          Technology Management
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Stack
            </h1>

            <p className="text-gray-500 mt-3 max-w-xl">
              Manage the technologies and development tools
              displayed throughout your portfolio.
            </p>
          </div>

          <div className="font-mono text-xs text-gray-700">
            04 CATEGORIES
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-6 border border-white/10 bg-white/3 rounded-lg px-4 py-3 text-sm text-gray-300">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 border border-red-500/20 bg-red-500/5 rounded-lg px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <StackForm
        initialData={stack}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
};

export default Stack;