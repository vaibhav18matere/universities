import Image from "next/image";

type CollegeCoverImageProps = {
  readonly src: string;
  readonly alt: string;
  readonly sizes: string;
  readonly priority: boolean;
  readonly aspectClassName: string;
};

export function CollegeCoverImage(props: CollegeCoverImageProps) {
  const { src, alt, sizes, priority, aspectClassName } = props;

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-200 dark:bg-slate-800 ${aspectClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/55 via-slate-950/10 to-transparent dark:from-slate-950/70"
        aria-hidden
      />
    </div>
  );
}
