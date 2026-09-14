import { useEffect, useState } from "react";
import { getContact } from "../../services/contactService";
import { sendMessage } from "../../services/messageService";
import Reveal from "./Reveal";
import { Mail } from "lucide-react";

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.76c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.68.9.68 1.81v2.67c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M5.35 3.5a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7ZM3.75 8.7h3.2V20h-3.2V8.7Zm5.2 0H12v1.55h.04c.43-.81 1.49-1.66 3.06-1.66 3.27 0 3.88 2.15 3.88 4.94V20h-3.2v-5.72c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.2 1.48-2.2 3.01V20H8.48V8.7h.47Z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.5 11.8a8.3 8.3 0 0 1-12.3 7.3L3.5 20.5l1.4-4.6A8.3 8.3 0 1 1 20.5 11.8Z" />
    <path d="M9.1 7.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.5.7c.5 1 1.3 1.8 2.3 2.3l.7-.5c.2-.1.4-.1.6 0l1.6.7c.3.1.4.3.4.5v.5c0 .4-.2.7-.6.8-.5.2-1.2.2-2.2-.2-1.2-.5-2.4-1.4-3.3-2.3-.9-.9-1.8-2.1-2.3-3.3-.4-1-.4-1.7-.2-2.2Z" />
  </svg>
);

const Contact = () => {
  const [contact, setContact] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await getContact();
        setContact(data);
      } catch (err) {
        console.error("Failed to load contact:", err);
      }
    };

    loadContact();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSubmitted(false);

      await sendMessage(formData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const channels = contact?.channels;

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#08090a] text-white border-t border-white/10"
    >
      <div className="max-w-300 mx-auto px-6 md:px-10 py-24 md:pt-15">
        {/* SECTION LABEL */}
        <Reveal className="flex items-center gap-5 mb-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
            /05
          </span>

          <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500">
            CONTACT
          </span>
        </Reveal>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-24">
          {/* LEFT */}
          <Reveal>
            <div className="max-w-155">
              <h2 className="text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.86] tracking-[-0.06em] font-bold uppercase">
                {contact?.sectionCopy?.headline ||
                  "LET'S BUILD SOMETHING."}
              </h2>

              <p className="mt-5 text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed">
                {contact?.sectionCopy?.supportingText ||
                  "Have an idea, project or opportunity? Let's talk."}
              </p>
            </div>

            {/* CHANNELS */}
            <div className="mt-10">
              {[
                {
                  label: "GITHUB",
                  url: channels?.githubUrl,
                  Icon: GitHubIcon,
                },
                {
                  label: "LINKEDIN",
                  url: channels?.linkedinUrl,
                  Icon: LinkedInIcon,
                },
                {
                  label: "WHATSAPP",
                  url: channels?.whatsappUrl,
                  Icon: WhatsAppIcon,
                },
                {
                  label: "EMAIL",
                  url: channels?.email
                    ? `mailto:${channels.email}`
                    : "",
                  Icon: Mail,
                },
              ].map((channel) => (
                <a
                  key={channel.label}
                  href={channel.url || "#"}
                  target={
                    channel.label === "EMAIL"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    channel.label === "EMAIL"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="public-row group flex items-center justify-between py-5 border-b border-white/15 hover:border-white/40"
                >
                  <div className="flex items-center gap-5">
                    <channel.Icon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-300 group-hover:text-blue-400" />

                    <span className="hidden">
                      {channel.icon === "github" && "◌"}
                      {channel.icon === "linkedin" && "in"}
                      {channel.icon === "whatsapp" && "○"}
                      {channel.icon === "email" && "✉"}
                    </span>

                    <span className="text-xs font-mono tracking-[0.25em] text-gray-500 group-hover:text-white transition">
                      {channel.label}
                    </span>
                  </div>

                  <span className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition">
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="public-card border border-white/20 p-8 md:p-10"
            >
              <div className="space-y-10">
                {/* NAME */}
                <div>
                  <label className="block text-[10px] font-mono tracking-[0.3em] text-gray-600 mb-4">
                    NAME
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-4 text-white placeholder:text-gray-600 outline-none focus:border-white transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-[10px] font-mono tracking-[0.3em] text-gray-600 mb-4">
                    EMAIL
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-4 text-white placeholder:text-gray-600 outline-none focus:border-white transition"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-[10px] font-mono tracking-[0.3em] text-gray-600 mb-4">
                    MESSAGE
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about the project..."
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-4 text-white placeholder:text-gray-600 outline-none focus:border-white transition resize-none"
                  />
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-7 min-h-10.5">
                {submitted && (
                  <div className="flex gap-2 text-[10px] font-mono tracking-[0.15em] text-blue-500 uppercase">
                    <span>✓</span>

                    <span>
                      Message sent — I'll reply within 24 hours
                    </span>
                  </div>
                )}

                {error && (
                  <p className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                    {error}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="public-action w-full mt-4 bg-white text-black px-6 py-5 flex items-center justify-between text-[11px] font-mono tracking-[0.25em] uppercase hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </span>

                <span className="text-xl">→</span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
