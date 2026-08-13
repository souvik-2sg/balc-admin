import Link from "next/link";
import { notFound } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { connectDB } from "@/lib/mongodb";
import Election from "@/model/Election";

type Props = { params: Promise<{ id: string }> };

export default async function ElectionDetailsPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const election = await Election.findById(id).lean();
  if (!election) notFound();
  const item = JSON.parse(JSON.stringify(election));
  const periods = [["Nomination", item.nomination], ["Withdrawal", item.withdrawal], ["Voting", item.voting]] as const;

  return <div><PageBreadcrumb pageTitle="Election details" /><div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">{item.name}</h1><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description || "No description provided."}</p></div><Link href={`/admin/manage-election/list-election/${item._id}/edit`} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">Edit election</Link></div><section className="grid gap-5 lg:grid-cols-3">{periods.map(([title, period]) => <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]"><h2 className="font-semibold text-gray-800 dark:text-white/90">{title} period</h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-gray-500">Starts</dt><dd className="font-medium text-gray-800 dark:text-gray-200">{period.startDate} · {period.startTime}</dd></div><div><dt className="text-gray-500">Ends</dt><dd className="font-medium text-gray-800 dark:text-gray-200">{period.endDate} · {period.endTime}</dd></div></dl></div>)}</section><section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]"><div className="grid gap-5 sm:grid-cols-3"><div><p className="text-sm text-gray-500">Location</p><p className="mt-1 font-medium text-gray-800 dark:text-gray-200">{item.location}</p></div><div><p className="text-sm text-gray-500">Eligible wings</p><p className="mt-1 font-medium text-gray-800 dark:text-gray-200">{item.wings.join(", ")}</p></div><div><p className="text-sm text-gray-500">Status</p><p className="mt-1 font-medium capitalize text-gray-800 dark:text-gray-200">{item.status || "active"}</p></div></div><div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800"><p className="text-sm text-gray-500">Posts</p><p className="mt-1 font-medium text-gray-800 dark:text-gray-200">{item.postDesignations.join(", ")}</p></div></section></div>;
}
