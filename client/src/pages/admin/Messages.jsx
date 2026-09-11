import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  Check,
} from "lucide-react";

import {
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../../services/messageService";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const openMessage = async (message) => {
    setSelectedMessage(message);

    if (!message.read) {
      try {
        const updatedMessage = await updateMessageStatus(
          message._id,
          true
        );

        setMessages((currentMessages) =>
          currentMessages.map((item) =>
            item._id === updatedMessage._id
              ? updatedMessage
              : item
          )
        );

        setSelectedMessage(updatedMessage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleRead = async (message) => {
    try {
      const updatedMessage = await updateMessageStatus(
        message._id,
        !message.read
      );

      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item._id === updatedMessage._id
            ? updatedMessage
            : item
        )
      );

      if (selectedMessage?._id === updatedMessage._id) {
        setSelectedMessage(updatedMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (message) => {
    const confirmed = window.confirm(
      "Delete this message?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteMessage(message._id);

      setMessages((currentMessages) =>
        currentMessages.filter(
          (item) => item._id !== message._id
        )
      );

      setSelectedMessage(null);
    } catch (error) {
      console.error(error);
      setError("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = messages.filter(
    (message) => !message.read
  ).length;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (selectedMessage) {
    return (
      <div className="min-h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedMessage(null)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Message
              </p>

              <h1 className="mt-1 text-xl font-medium text-white">
                {selectedMessage.subject ||
                  "No subject"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                toggleRead(selectedMessage)
              }
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
            >
              {selectedMessage.read ? (
                <>
                  <Mail size={16} />
                  Mark unread
                </>
              ) : (
                <>
                  <Check size={16} />
                  Mark read
                </>
              )}
            </button>

            <button
              onClick={() =>
                handleDelete(selectedMessage)
              }
              disabled={deleting}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:border-red-500/40 hover:text-red-300 disabled:opacity-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Sender */}
        <div className="border-b border-white/10 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg text-white">
                {selectedMessage.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {selectedMessage.email}
              </p>
            </div>

            <div className="text-right text-xs text-gray-600">
              <p>
                {formatDate(selectedMessage.createdAt)}
              </p>

              <p className="mt-1">
                {formatTime(selectedMessage.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="py-8">
          <p className="whitespace-pre-line text-sm leading-7 text-gray-300">
            {selectedMessage.message}
          </p>
        </div>

        {/* Reply */}
        <div className="border-t border-white/10 pt-6">
          <a
            href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
              `Re: ${
                selectedMessage.subject ||
                "Your message"
              }`
            )}`}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            <Reply size={16} />
            Reply via email
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Page header */}
      <div className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Inbox
          </p>

          <h1 className="mt-2 text-2xl font-medium text-white">
            Messages
          </h1>
        </div>

        <div className="text-right">
          <p className="text-2xl font-light text-white">
            {messages.length}
          </p>

          <p className="text-xs uppercase tracking-wider text-gray-600">
            Total
          </p>
        </div>
      </div>

      {/* Unread */}
      <div className="flex items-center justify-between border-b border-white/10 py-5">
        <p className="text-sm text-gray-500">
          {unreadCount} unread
        </p>

        <button
          onClick={loadMessages}
          className="text-xs uppercase tracking-wider text-gray-600 transition hover:text-white"
        >
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="border-b border-red-500/20 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-600">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="py-24 text-center">
          <Mail className="mx-auto mb-4 text-gray-700" size={28} />

          <p className="text-sm text-gray-500">
            No messages yet.
          </p>

          <p className="mt-2 text-xs text-gray-700">
            Messages from your contact form will appear here.
          </p>
        </div>
      ) : (
        <div>
          {messages.map((message) => (
            <div
              key={message._id}
              onClick={() => openMessage(message)}
              className={`group flex cursor-pointer items-center gap-5 border-b border-white/10 px-2 py-6 transition hover:bg-white/3 ${
                !message.read
                  ? "bg-white/1.5"
                  : ""
              }`}
            >
              {/* Status */}
              <div className="w-5">
                {message.read ? (
                  <MailOpen
                    size={17}
                    className="text-gray-700"
                  />
                ) : (
                  <Mail
                    size={17}
                    className="text-white"
                  />
                )}
              </div>

              {/* Sender */}
              <div className="w-48 min-w-0">
                <p
                  className={`truncate text-sm ${
                    message.read
                      ? "text-gray-400"
                      : "font-medium text-white"
                  }`}
                >
                  {message.name}
                </p>

                <p className="mt-1 truncate text-xs text-gray-700">
                  {message.email}
                </p>
              </div>

              {/* Subject/message */}
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm ${
                    message.read
                      ? "text-gray-500"
                      : "text-gray-300"
                  }`}
                >
                  {message.subject ||
                    "No subject"}
                </p>

                <p className="mt-1 truncate text-xs text-gray-700">
                  {message.message}
                </p>
              </div>

              {/* Email status */}
              <div className="hidden w-20 md:block">
                {message.emailSent ? (
                  <span className="text-[10px] uppercase tracking-wider text-gray-600">
                    Sent
                  </span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-red-500/70">
                    Failed
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="hidden w-24 text-right sm:block">
                <p className="text-xs text-gray-600">
                  {formatDate(message.createdAt)}
                </p>
              </div>

              {/* Delete */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(message);
                }}
                className="opacity-0 transition group-hover:opacity-100"
              >
                <Trash2
                  size={16}
                  className="text-gray-700 transition hover:text-red-400"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;