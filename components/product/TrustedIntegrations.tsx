"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const integrations = [
  { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" },
  { name: "Salesforce", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png" },
  { name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" },
  { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "ChatGPT", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/1280px-ChatGPT-Logo.svg.png" },
  { name: "Shopify", src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Dropbox", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Dropbox_logo.svg/1280px-Dropbox_logo.svg.png" },
  { name: "Zendesk", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Zendesk_logo.svg/960px-Zendesk_logo.svg.png" },
  { name: "HubSpot", src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "Trello", src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Trello-logo-blue.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_(2012).svg" },
  { name: "Oracle", src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Adobe", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/1280px-Adobe_Corporate_logo.svg.png" },
  { name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png" },
  { name: "Asana", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/1280px-Asana_logo.svg.png" },
];

export default function TrustedIntegration() {

  const trackRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startTranslate = useRef(0);
  const currentTranslate = useRef(0);

  useEffect(() => {

    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let lastTime = 0;

    const speed = 30;

    const animate = (time: number) => {

      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging.current) {

        currentTranslate.current -= speed * delta;

        const width = track.scrollWidth / 2;

        if (Math.abs(currentTranslate.current) >= width) {
          currentTranslate.current += width;
        }

        track.style.transform = `translateX(${currentTranslate.current}px)`;

      }

      raf = requestAnimationFrame(animate);

    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);

  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {

    isDragging.current = true;

    startX.current = e.clientX;
    startTranslate.current = currentTranslate.current;

  };

  const handleMouseMove = (e: React.MouseEvent) => {

    if (!isDragging.current) return;

    const delta = e.clientX - startX.current;

    currentTranslate.current = startTranslate.current + delta;

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }

  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const logos = [...integrations, ...integrations];

  return (
    <section className="relative py-16 md:py-24 border-y border-white/5 bg-[#030817] overflow-hidden">

      <div className="text-center mb-10 md:mb-14 px-6">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Trusted Integrations
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Connect your enterprise workflows with industry-leading platforms.
        </p>
      </div>

      <div className="relative w-full overflow-hidden bg-white/95">

        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-32 bg-gradient-to-r from-[#030817] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-32 bg-gradient-to-l from-[#030817] to-transparent z-10" />

        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >

          <div
            ref={trackRef}
            className="flex items-center gap-12 md:gap-24 px-6 py-8 md:py-12 will-change-transform select-none"
          >

            {logos.map((item, idx) => (

              <div
                key={`${item.name}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center max-w-[80px] md:max-w-[150px]"
              >

                <Image
                  src={item.src}
                  alt={item.name}
                  width={240}
                  height={100}
                  draggable={false}
                  className="h-6 md:h-8 w-full object-contain pointer-events-none"
                />

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}