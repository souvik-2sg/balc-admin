"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EyeIcon, PencilIcon } from "@/icons";

type Election = {
  _id: string;
  name: string;
  location: string;
  voting: { startDate: string; startTime: string };
  status?: "active" | "suspended";
};

export default function ElectionList() {
  const [elections, setElections] = useState<Election[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [electionToSuspend, setElectionToSuspend] = useState<Election | null>(null);

  const loadElections = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/elections");
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setElections(result.data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load elections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadElections(); }, []);

  const updateStatus = async (election: Election, status: "active" | "suspended") => {
    try {
      const response = await fetch(`/api/elections/${election._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setElections((items) => items.map((item) => item._id === election._id ? { ...item, status } : item));
      setMessage(`Election ${status === "suspended" ? "suspended" : "resumed"} successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update election.");
    }
  };

  return (
    <>
    <section className="rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
        <div><h2 className="text-base font-semibold text-gray-800 dark:text-white/90">Saved elections</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View, edit, or suspend an election.</p></div>
        <Link href="/manage-election/add-election" className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">Add election</Link>
      </div>
      {message && <p role="status" className="mx-5 mt-5 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500 dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-400"><tr><th className="px-5 py-4 sm:px-6">Election title</th><th className="px-5 py-4">Voting starts</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right sm:px-6">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-500">Loading elections…</td></tr> : elections.length === 0 ? <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-500">No elections have been created yet.</td></tr> : elections.map((election) => <tr key={election._id} className="text-gray-700 dark:text-gray-300"><td className="px-5 py-4 sm:px-6"><Link href={`/manage-election/list-election/${election._id}`} className="font-medium text-brand-500 hover:underline">{election.name}</Link></td><td className="px-5 py-4">{election.voting.startDate} · {election.voting.startTime}</td><td className="px-5 py-4">{election.location}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${election.status === "suspended" ? "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400" : "bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400"}`}>{election.status === "suspended" ? "Suspended" : "Active"}</span></td><td className="px-5 py-4 sm:px-6"><div className="flex justify-end gap-2"><Link aria-label={`View ${election.name}`} title="View" href={`/manage-election/list-election/${election._id}`} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-white/5"><EyeIcon className="h-5 w-5" /></Link><Link aria-label={`Edit ${election.name}`} title="Edit" href={`/manage-election/list-election/${election._id}/edit`} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-white/5"><PencilIcon className="h-5 w-5" /></Link><button type="button" onClick={() => election.status === "suspended" ? updateStatus(election, "active") : setElectionToSuspend(election)} aria-label={`${election.status === "suspended" ? "Resume" : "Suspend"} ${election.name}`} title={election.status === "suspended" ? "Resume election" : "Suspend election"} className="rounded-lg p-2 text-gray-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10"><span className="block h-5 w-5 rounded-full border-2 border-current"><span className="mx-auto mt-[7px] block h-0.5 w-2.5 bg-current" /></span></button></div></td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
    {electionToSuspend && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="suspend-election-title">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
          <h2 id="suspend-election-title" className="text-lg font-semibold text-gray-800 dark:text-white/90">Suspend election?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">Are you sure you want to suspend <strong className="font-semibold text-gray-700 dark:text-gray-200">{electionToSuspend.name}</strong>? This will mark the election as suspended until it is resumed.</p>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setElectionToSuspend(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5">Cancel</button>
            <button type="button" onClick={() => { updateStatus(electionToSuspend, "suspended"); setElectionToSuspend(null); }} className="rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600">Yes, suspend</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
