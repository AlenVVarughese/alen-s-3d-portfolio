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

  // Build cloudinary mp4 fallback (Safari/iOS doesn't support webm/vp9)
  const mp4Url = url
    .replace("/video/upload/", "/video/upload/f_mp4,vc_h264/")
    .replace(/\.webm(\?|$)/i, ".mp4$1");
  const isCloudinary = /res\.cloudinary\.com/.test(url);

  useEffect(() => {
    if (ref.current) {
      ref.current.muted = muted;
      // ensure play after mount (some browsers ignore autoplay attr on hydration)
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [muted, url]);

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
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          poster={isCloudinary ? url.replace("/video/upload/", "/video/upload/so_0/").replace(/\.(webm|mp4|mov)(\?|$)/i, ".jpg$2") : undefined}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        >
          {isCloudinary && <source src={mp4Url} type="video/mp4" />}
          <source src={url} type={/\.webm/i.test(url) ? "video/webm" : "video/mp4"} />
        </video>
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
