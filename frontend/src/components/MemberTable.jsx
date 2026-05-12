const MemberTable = ({ members, onSelect }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-900/70 text-slate-400">
          <tr>
            <th className="px-5 py-3">Member</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Active Issues</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/30">
          {members.map((member) => (
            <tr
              key={member.userId}
              onClick={() => onSelect(member)}
              className="cursor-pointer hover:bg-slate-900/60"
            >
              <td className="px-5 py-4 text-white">{member.name}</td>
              <td className="px-5 py-4 text-slate-300">{member.email}</td>
              <td className="px-5 py-4 text-slate-300">{member.activeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
