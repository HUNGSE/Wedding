import { useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";  // ⬅ THÊM DÒNG NÀY
import { TEXT_CONTENT, GUESTBOOK_SAMPLES } from "../../data/weddingData";

const GuestbookForm = memo(({ onSubmit }) => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder={TEXT_CONTENT.guestbook.placeholderName}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm"
                    required
                />
                <input
                    type="email"
                    placeholder={TEXT_CONTENT.guestbook.placeholderEmail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm"
                />
            </div>
            <textarea
                placeholder={TEXT_CONTENT.guestbook.placeholderMessage}
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm mb-4"
                required
            ></textarea>
            <button type="submit" className="bg-[#b588a1] text-white px-6 py-2 rounded-md hover:bg-[#9c726d] transition w-full">
                {TEXT_CONTENT.guestbook.buttonText}
            </button>
        </form>
    );
});

GuestbookForm.displayName = "GuestbookForm";

// ---------------- LIST ----------------
const GuestbookList = memo(({ items }) => (
    <div className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left max-h-[420px] overflow-y-auto">
        {items.map((item, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={idx === 0 ? "mb-6" : "border-t border-gray-200 pt-4 mt-4"}
            >
                <h4 className="font-semibold text-[#5a4585]">{item.name}</h4>
                <p className="text-gray-700 text-sm italic leading-relaxed">{item.message}</p>
            </motion.div>
        ))}
    </div>
));

GuestbookList.displayName = "GuestbookList";

// ---------------- MAIN COMPONENT ----------------
export default function Guestbook() {
    const [messages, setMessages] = useState(GUESTBOOK_SAMPLES);
    useEffect(() => {
        const stored = localStorage.getItem("guestbookMessages");
        if (stored) {
            setMessages(JSON.parse(stored));
        }
    }, []);

    const sendEmail = async (data) => {
        const time = new Date().toLocaleString("vi-VN");

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    time,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            console.log("🎉 Email sent successfully!");
        } catch (err) {
            console.error("❌ Email send error:", err);
        }
    };
    const handleSubmit = useCallback(
        (formData) => {
            const newList = [formData, ...messages];
            setMessages(newList);
            localStorage.setItem("guestbookMessages", JSON.stringify(newList));
            sendEmail(formData);
        },
        [messages]
    );


    return (
        <section id="guestbook" className="relative py-24 bg-[#fcf7fa] text-center overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h2 className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-2">
                        {TEXT_CONTENT.guestbook.title}
                    </h2>
                    <p className="text-[#6d6d6d] font-[Poppins,sans-serif] mb-12">
                        {TEXT_CONTENT.guestbook.description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 justify-center">
                    <GuestbookForm onSubmit={handleSubmit} />
                    <GuestbookList items={messages} />
                </div>
            </div>
        </section>
    );
}
