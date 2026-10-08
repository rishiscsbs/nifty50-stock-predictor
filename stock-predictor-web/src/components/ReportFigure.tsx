import Image from "next/image";

type Props = {
  src: string;
  caption: string;
  priority?: boolean;
};

export function ReportFigure({ src, caption, priority }: Props) {
  return (
    <figure className="my-4 overflow-hidden rounded-lg border border-zinc-700/80 bg-zinc-900/50">
      <div className="relative w-full bg-white">
        <Image
          src={src}
          alt={caption}
          width={1400}
          height={800}
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      <figcaption className="border-t border-zinc-700/80 px-3 py-2 text-center text-xs text-zinc-400">
        {caption}
      </figcaption>
    </figure>
  );
}
