import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  url: string;
  className?: string;
  withAudioToggle?: boolean;
  defaultMuted?: boolean;
}

export function ProfileMedia({ url, className = "", withAudioToggle = false, defaultMuted = true }: Props) {
  const isVideo = /\.(webm|mp4|mov)(\?|$)/i.test(url);
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(defaultMuted);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
    if (!next) {
      v.volume = 1;
      v.play().catch(() => {});
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isVideo ? (
        <video
          ref={ref}
          key={url}
          src={url}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img src={url} alt="Profile" className="w-full h-full object-cover" />
      )}
      {isVideo && withAudioToggle && (
        <button
          onClick={toggle}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-2 right-2 size-7 rounded-full bg-background/70 backdrop-blur border border-gold/40 grid place-items-center text-gold hover:bg-gold hover:text-primary-foreground transition-colors z-10"
        >
          {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
        </button>
      )}
    </div>
  );
}
