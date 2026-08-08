import { notFound } from "next/navigation";
import { frameworks, getFramework } from "@/lib/nca";
import NcaDetail from "@/components/NcaDetail";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) return { title: "إطار غير موجود" };
  return {
    title: `${f.code} — ${f.ar}`,
    description: `${f.descAr} يضم ${f.totalControls} ضابطًا موزعة على ${f.domains.length} مجالات، مع ملفات التقييم والوثائق الرسمية للتحميل.`,
    alternates: { canonical: `/nca/${slug}` },
    openGraph: {
      title: `${f.code} — ${f.ar}`,
      description: f.descAr,
      url: `https://alfaisal.ai/nca/${slug}`,
      type: "article",
    },
  };
}

export default async function NcaFrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFramework(slug);
  if (!f) notFound();
  return <NcaDetail framework={f} />;
}
