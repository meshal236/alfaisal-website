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
  return { title: f ? `${f.code} — ${f.ar} | مشعل الفيصل` : "NCA" };
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
