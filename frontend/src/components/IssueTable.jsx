import { formatDate } from "../utils/formatters.js";

const IssueTable = ({ issues, onReturn }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-900/70 text-slate-400">
          <tr>
            <th className="px-5 py-3">Book</th>
            <th className="px-5 py-3">Member</th>
            <th className="px-5 py-3">Issued</th>
            <th className="px-5 py-3">Return</th>
            {onReturn && <th className="px-5 py-3">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/30">
          {issues.map((issue) => (
            <tr key={issue.issue_id} className="hover:bg-slate-900/60">
              <td className="px-5 py-4 text-white">{issue.bookTitle}</td>
              <td className="px-5 py-4 text-slate-300">{issue.memberName}</td>
              <td className="px-5 py-4 text-slate-300">{formatDate(issue.issue_date)}</td>
              <td className="px-5 py-4 text-slate-300">
                {issue.return_date ? formatDate(issue.return_date) : "Pending"}
              </td>
              {onReturn && (
                <td className="px-5 py-4">
                  <button
                    onClick={() => onReturn(issue)}
                    className="px-3 py-1 rounded-full bg-brand-600 text-white text-xs"
                  >
                    Return
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
