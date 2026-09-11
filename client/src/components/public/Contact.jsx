import { useEffect, useState } from "react";
import { getContact } from "../../services/contactService";
import { sendMessage } from "../../services/messageService";
import Reveal from "./Reveal";

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
                  icon: "github",
                },
                {
                  label: "LINKEDIN",
                  url: channels?.linkedinUrl,
                  icon: "linkedin",
                },
                {
                  label: "WHATSAPP",
                  url: channels?.whatsappUrl,
                  icon: "whatsapp",
                },
                {
                  label: "EMAIL",
                  url: channels?.email
                    ? `mailto:${channels.email}`
                    : "",
                  icon: "email",
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
                  className="group flex items-center justify-between py-5 border-b border-white/15 hover:border-white/40 transition"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-gray-600 text-xs">
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
              className="border border-white/20 p-8 md:p-10"
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
                className="w-full mt-4 bg-white text-black px-6 py-5 flex items-center justify-between text-[11px] font-mono tracking-[0.25em] uppercase hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
