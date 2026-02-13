import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="font-archivo text-4xl md:text-6xl text-[#C1FF00] mb-4">
        404
      </h1>
      <p className="text-white/70 text-lg mb-8 text-center">
        Page introuvable
      </p>
      <Link
        href="/"
        className="rounded-full border border-[#C1FF00] bg-[#C1FF00]/10 px-6 py-3 text-[#C1FF00] font-medium transition-colors hover:bg-[#C1FF00]/20"
      >
        Retour à l&apos;accueil
      </Link>
      <Link
        href="/blog"
        className="mt-4 text-sm text-white/50 hover:text-white/80"
      >
        Voir le blog
      </Link>
    </div>
  );
}
