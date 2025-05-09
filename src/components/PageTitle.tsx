interface PageTitleProps {
  title: string;
  subTitle: string;
}

export default function PageTitle({ title, subTitle }: PageTitleProps) {
  return (
    <div className="py-12">
      <div className="text-3xl font-bold">{title}</div>
      <div className="mt-1 text-sm text-zinc-500">{subTitle}</div>
    </div>
  );
}
