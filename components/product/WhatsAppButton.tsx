import React from "react";

const CONTACT_NUMBER = "918700236923";

interface WhatsAppButtonProps {
  message: string;
  buttonText?: string;
  noteText?: string;
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  shadowColor?: string;
  hoverShadowColor?: string;
  className?: string;
}

const isHex = (val: string) => val?.startsWith("#");

// 🔥 helper: hex → rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const WhatsAppButton = ({
  message,
  buttonText = "Chat on WhatsApp",
  noteText = "Instant Response · No Forms · No Spam",
  gradientFrom = "from-green-500",
  gradientTo = "to-emerald-500",
  hoverFrom = "hover:from-green-400",
  hoverTo = "hover:to-emerald-400",
  shadowColor = "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
  hoverShadowColor = "hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]",
  className = "mt-8",
}: WhatsAppButtonProps) => {

  const handleWhatsAppRedirect = () => {
    const waMsg = encodeURIComponent(message);

    window.open(
      `https://api.whatsapp.com/send?phone=${CONTACT_NUMBER}&text=${waMsg}`,
      "_blank"
    );
  };

  const useInline = isHex(gradientFrom) && isHex(gradientTo);

  return (
    <div className={className}>
      <button
        onClick={handleWhatsAppRedirect}
        className={`group inline-flex items-center gap-3 px-8 py-4 rounded-2xl 
        text-white text-sm font-black tracking-wider uppercase
        transition-all duration-300
        ${!useInline ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} ${hoverFrom} ${hoverTo}` : ""}
        ${!useInline ? shadowColor + " " + hoverShadowColor : ""}`}
        
        style={
          useInline
            ? {
                background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                boxShadow: `0 0 40px ${hexToRgba(gradientFrom, 0.3)}`
              }
            : undefined
        }

        onMouseEnter={(e) => {
          if (useInline) {
            e.currentTarget.style.boxShadow = `0 0 60px ${hexToRgba(gradientFrom, 0.5)}`;
          }
        }}

        onMouseLeave={(e) => {
          if (useInline) {
            e.currentTarget.style.boxShadow = `0 0 40px ${hexToRgba(gradientFrom, 0.3)}`;
          }
        }}
      >
        <span>{buttonText}</span>

        <span className="text-xs opacity-70 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>

      <p className="text-slate-600 text-[10px] mt-3 uppercase tracking-widest">
        {noteText}
      </p>
    </div>
  );
};

export default WhatsAppButton;