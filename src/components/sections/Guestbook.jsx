import { useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { TEXT_CONTENT } from "../../data/weddingData";
import { toast } from "react-toastify";

/* ================= CONFIG ================= */
const SHEET_API_URL =
    "https://script.google.com/macros/s/AKfycbzGp7aSNwNAc2AoNUGErob3xaHWhTB2wnIMTl6nlNW16ZeeF11IUbadwerkQE8g8MdHSg/exec";

/* ================= FORM ================= */
const GuestbookForm = memo(({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", message: "" });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left"
        >
            <input
                type="text"
                placeholder={TEXT_CONTENT.guestbook.placeholderName}
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm mb-4"
                required
            />

            <textarea
                placeholder={TEXT_CONTENT.guestbook.placeholderMessage}
                rows="5"
                value={formData.message}
                onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm mb-4"
                required
            />

            <button
                type="submit"
                className="bg-[#b588a1] text-white px-6 py-2 rounded-md hover:bg-[#9c726d] transition w-full"
            >
                {TEXT_CONTENT.guestbook.buttonText}
            </button>
        </form>
    );
});

GuestbookForm.displayName = "GuestbookForm";

/* ================= LIST ================= */
const GuestbookList = memo(({ items }) => (
    <div className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left max-h-[420px] overflow-y-auto">
        {items.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center">
                Chưa có lời chúc nào 💌
            </p>
        )}

        {items.map((item, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={
                    idx === 0
                        ? "mb-6"
                        : "border-t border-gray-200 pt-4 mt-4"
                }
            >
                <h4 className="font-semibold text-[#5a4585]">
                    {item.name}
                </h4>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                    {item.message}
                </p>
            </motion.div>
        ))}
    </div>
));

GuestbookList.displayName = "GuestbookList";

/* ================= MAIN ================= */
export default function Guestbook() {
    const [messages, setMessages] = useState([]);
    const [inlineNoticeName, setInlineNoticeName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(SHEET_API_URL)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("❌ Không tải được lời chúc");
                setLoading(false);
            });
    }, []);

    const sendWishToSheet = async (data) => {
        await fetch(SHEET_API_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });
    };

    const handleSubmit = useCallback(
        async (formData) => {
            try {
                setMessages((prev) => [formData, ...prev]);

                setInlineNoticeName(formData.name);
                setTimeout(() => setInlineNoticeName(null), 8000);

                await sendWishToSheet(formData);
            } catch {
                toast.error("❌ Gửi lời chúc của bạn đang có sự cố, chúng tôi sẽ báo cho Cô Dâu & Chú Rể ngay!");
            }
        },
        []
    );

    return (
        <section
            id="guestbook"
            className="relative py-24 bg-[#fcf7fa] text-center overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-2">
                        {TEXT_CONTENT.guestbook.title}
                    </h2>
                    <p className="text-[#6d6d6d] font-[Poppins,sans-serif] mb-12">
                        {TEXT_CONTENT.guestbook.description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 justify-center">
                    <GuestbookForm onSubmit={handleSubmit} />

                    <div className="space-y-4">
                        {inlineNoticeName && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-5 rounded-xl border border-pink-200 bg-pink-50 text-center"
                            >
                                <p
                                    className="text-pink-600 font-medium text-sm leading-relaxed"
                                    style={{ whiteSpace: "pre-line" }}
                                >
                                    {`💌 Lời chúc của ${inlineNoticeName} đã được gửi thành công tới Cô Dâu & Chú Rể.
Cảm ơn tình cảm của ${inlineNoticeName} rất nhiều!`}
                                </p>
                            </motion.div>
                        )}

                        {loading ? (
                            <p className="text-sm text-gray-500 italic text-center">
                                Đang tải lời chúc…
                            </p>
                        ) : (
                            <GuestbookList items={messages} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
