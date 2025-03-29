"use client";

export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/anim1.mp4" type="video/mp4" />
      </video>
    </div>
  );
} 