import React from "react";

export default function ChatButton({ phoneNumber, sellerName }) {
    const sendWhatsAppMessage = () => {
        const message = `Hi ${sellerName}, I am interested in your product.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    console.log(phoneNumber, sellerName);

    return (
        <button
            type="button"
            className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-secondary"
            onClick={sendWhatsAppMessage}
        >
            <i className="fab fa-whatsapp"></i> Chat with seller
        </button>
    );
}
