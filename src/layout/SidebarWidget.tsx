import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-xl border border-gold-200 bg-gold-50 px-4 py-5 text-center dark:border-gold-500/20 dark:bg-gold-500/10`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Bengal Association
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Literature, culture, and community administration.
      </p>
      <div className="h-px w-10 mx-auto bg-gold-300 dark:bg-gold-500/60" />
    </div>
  );
}
