import { useEffect, useState } from "react";

const Alert = ({ message, type = "success", onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    const slideDownAnimation = `
        @keyframes slide-down {
            from {
                transform: translateX(-50%) translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        .animate-slide-down {
            animation: slide-down 0.3s ease-out;
        }
    `;

    return (
        <>
            <style>{slideDownAnimation}</style>
            <div
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[1000] px-5 py-2.5 rounded-md text-white text-base font-bold shadow-lg animate-slide-down ${
                    type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            >
                {message}
            </div>
        </>
    );
};

export default Alert;