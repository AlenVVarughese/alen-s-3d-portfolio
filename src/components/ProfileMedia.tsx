interface Props {
  url: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProfileMedia({ url, className = "" }: Props) {
  const isVideo = /\.(webm|mp4|mov)(\?|$)/i.test(url);
  return (
    <div className={className}>
      {isVideo ? (
        <video
          key={url}
          src={url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img src={url} alt="Profile" className="w-full h-full object-cover" />
      )}
    </div>
  );
}
