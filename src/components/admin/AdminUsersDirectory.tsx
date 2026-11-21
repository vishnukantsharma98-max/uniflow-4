import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import {
  Users,
  Search,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  User as UserIcon,
  CheckCircle,
  Copy,
  Check,
  Eye,
  X,
} from 'lucide-react';
import { AuthUserRecord } from '../../types';
import { fetchAdminUsers } from '../../firebase/firestoreService';

interface AdminUsersDirectoryProps {
  currentUser: User;
}

export const AdminUsersDirectory: React.FC<AdminUsersDirectoryProps> = ({
  currentUser,
}) => {
  const [users, setUsers] = useState<AuthUserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<
    'ALL' | 'primaryAdmin' | 'secondaryAdmin' | 'user'
  >('ALL');
  const [selectedUser, setSelectedUser] = useState<AuthUserRecord | null>(null);
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminUsers(currentUser);
      setUsers(data);
    } catch (err: any) {
      console.error('[AdminUsers] Error loading users:', err);
      setError(
        err.message || 'Failed to load Firebase Authentication user directory'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentUser]);

  const handleCopyUid = (uid: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(uid);
    setCopiedUid(uid);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.email?.toLowerCase().includes(q) ||
        u.displayName?.toLowerCase().includes(q) ||
        u.uid?.toLowerCase().includes(q);

      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight flex items-center gap-2.5 text-[#171717] dark:text-[#F4F1E8]">
              <span className="w-10 h-10 rounded-xl bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
                <Users className="w-5 h-5 stroke-[2.5]" />
              </span>
              <span>Authentication User Directory</span>
            </h2>
            {!loading && !error && (
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-[#FFD84D] text-[#171717] border-2 border-[#171717] tabular-nums">
                {users.length} Total {users.length === 1 ? 'User' : 'Users'}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1.5">
            Authoritative directory of all verified Firebase Authentication users and administrators.
          </p>
        </div>

        <button
          type="button"
          onClick={loadUsers}
          disabled={loading}
          className="nb-btn nb-btn-white px-4 py-2.5 rounded-xl text-xs font-extrabold self-start sm:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 stroke-[2.5] ${loading ? 'animate-spin' : ''}`}
          />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="nb-card rounded-2xl p-4 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#171717] dark:text-[#F4F1E8] stroke-[2.5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name, email, or UID..."
            className="nb-input w-full pl-10 pr-16 py-2.5 rounded-xl text-xs sm:text-sm font-semibold"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] text-[11px] font-extrabold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {(['ALL', 'primaryAdmin', 'secondaryAdmin', 'user'] as const).map(
            (r) => {
              const labels = {
                ALL: `All Users (${users.length})`,
                primaryAdmin: 'Primary',
                secondaryAdmin: 'Secondary',
                user: 'Students',
              };
              const isActive = roleFilter === r;

              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  className={`px-3.5 py-2 rounded-xl border-2 text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[2px_2px_0px_#171717]'
                      : 'bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] border-[#171717]/30 dark:border-[#2B3347] hover:border-[#171717]'
                  }`}
                >
                  {labels[r]}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Directory Table Container */}
      <div className="nb-card-lg rounded-2xl bg-[#FFFFFF] dark:bg-[#161B26] overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-9 h-9 rounded-full border-4 border-[#171717] dark:border-[#FFD84D] border-t-[#FFD84D] dark:border-t-[#171717] animate-spin mx-auto" />
            <p className="text-xs font-bold text-[#525252] dark:text-[#9AA6BE]">
              Loading Firebase Authentication users...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3 px-4">
            <div className="w-14 h-14 mx-auto rounded-xl bg-[#FF6B6B] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 stroke-[2.5]" />
            </div>
            <p className="text-base font-black font-display text-[#171717] dark:text-[#F4F1E8]">
              Unable to load users
            </p>
            <p className="text-xs max-w-md mx-auto font-mono font-semibold text-[#525252] dark:text-[#9AA6BE]">
              {error}
            </p>
            <button
              type="button"
              onClick={loadUsers}
              className="nb-btn nb-btn-primary px-5 py-2.5 rounded-xl text-xs font-extrabold mt-2"
            >
              Retry
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center space-y-2 px-4">
            <div className="w-14 h-14 mx-auto rounded-xl bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
              <Users className="w-7 h-7 stroke-[2.5]" />
            </div>
            <p className="text-base font-black font-display text-[#171717] dark:text-[#F4F1E8]">
              No users match your criteria
            </p>
            <p className="text-xs font-medium text-[#525252] dark:text-[#9AA6BE]">
              Try adjusting your search query or role filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFD84D] text-[#171717] border-b-[3px] border-[#171717] text-[11px] font-black uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">User / Identity</th>
                  <th className="py-3.5 px-4">Role &amp; Access</th>
                  <th className="py-3.5 px-4">Provider / Auth</th>
                  <th className="py-3.5 px-4">Last Active</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#171717]/15 dark:divide-[#2B3347]">
                {filteredUsers.map((u) => {
                  const isPrimary = u.role === 'primaryAdmin';
                  const isSecondary = u.role === 'secondaryAdmin';

                  return (
                    <tr
                      key={u.uid}
                      onClick={() => setSelectedUser(u)}
                      className="group transition-colors cursor-pointer hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]"
                    >
                      {/* 1. User Identity */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] flex items-center justify-center font-black text-sm overflow-hidden shrink-0">
                            {u.photoURL ? (
                              <img
                                src={u.photoURL}
                                alt={u.displayName}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span>
                                {(u.displayName || u.email || 'U')[0].toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex flex-col">
                            <span className="text-xs sm:text-sm font-extrabold text-[#171717] dark:text-[#F4F1E8] truncate">
                              {u.displayName || 'UniFlow Student'}
                            </span>
                            <span className="text-[11px] font-mono font-semibold text-[#525252] dark:text-[#9AA6BE] truncate">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Role */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isPrimary ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black bg-[#FFD84D] text-[#171717] border-2 border-[#171717]">
                            <ShieldAlert className="w-3.5 h-3.5 stroke-[2.5]" />
                            Primary Admin
                          </span>
                        ) : isSecondary ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black bg-[#C9B6FF] text-[#171717] border-2 border-[#171717]">
                            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                            Secondary Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-[#B8F2E6] text-[#171717] border-2 border-[#171717]">
                            <UserIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                            Student User
                          </span>
                        )}
                      </td>

                      {/* 3. Provider & Verified */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono font-bold capitalize text-[#171717] dark:text-[#F4F1E8]">
                            {u.provider?.replace('.com', '') || 'Google'}
                          </span>
                          <span className="text-[11px] font-bold text-[#171717] dark:text-[#B8F2E6] flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-3 h-3 stroke-[2.5]" />
                            <span>Email Verified</span>
                          </span>
                        </div>
                      </td>

                      {/* 4. Last Active */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col text-[11px] font-mono font-bold text-[#171717] dark:text-[#F4F1E8] tabular-nums">
                          <span>
                            {new Date(u.lastSignInTime).toLocaleDateString()}
                          </span>
                          <span className="text-[10px] text-[#525252] dark:text-[#9AA6BE]">
                            {new Date(u.lastSignInTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* 5. Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(u);
                          }}
                          className="nb-btn-sm px-3 py-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Inspection Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75"
          onClick={() => setSelectedUser(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="nb-modal w-full max-w-lg rounded-2xl bg-[#FFFDF5] dark:bg-[#161B26] p-6 sm:p-8 space-y-6 relative"
          >
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="nb-btn-sm absolute right-5 top-5 p-2 rounded-lg bg-[#FFD84D] text-[#171717] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 pr-10">
              <div className="w-16 h-16 rounded-2xl bg-[#8EC5FF] text-[#171717] border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center font-black text-xl overflow-hidden shrink-0">
                {selectedUser.photoURL ? (
                  <img
                    src={selectedUser.photoURL}
                    alt={selectedUser.displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>
                    {(
                      selectedUser.displayName ||
                      selectedUser.email ||
                      'U'
                    )[0].toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-black font-display text-[#171717] dark:text-[#F4F1E8] truncate">
                  {selectedUser.displayName || 'UniFlow Student'}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#525252] dark:text-[#9AA6BE] truncate">
                  {selectedUser.email}
                </p>
                <div className="mt-2">
                  {selectedUser.role === 'primaryAdmin' ? (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#FFD84D] text-[#171717] border-2 border-[#171717]">
                      Primary Administrator (Owner)
                    </span>
                  ) : selectedUser.role === 'secondaryAdmin' ? (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#C9B6FF] text-[#171717] border-2 border-[#171717]">
                      Secondary Administrator
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#B8F2E6] text-[#171717] border-2 border-[#171717]">
                      Student User
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3">
              {/* UID with copy */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#0D1017] border-2 border-[#171717] dark:border-[#3D475E] flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] block">
                    Firebase Auth UID
                  </span>
                  <span className="text-xs font-mono font-bold text-[#171717] dark:text-[#F4F1E8] break-all">
                    {selectedUser.uid}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyUid(selectedUser.uid)}
                  className="nb-btn-sm p-2 rounded-lg bg-[#FFD84D] text-[#171717] shrink-0 cursor-pointer"
                  title="Copy UID"
                >
                  {copiedUid === selectedUser.uid ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#0D1017] border-2 border-[#171717] dark:border-[#3D475E]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] block">
                    Auth Provider
                  </span>
                  <span className="text-xs font-mono font-bold capitalize text-[#171717] dark:text-[#F4F1E8]">
                    {selectedUser.provider || 'Google OAuth'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#B8F2E6] text-[#171717] border-2 border-[#171717]">
                  <span className="text-[10px] font-black uppercase tracking-wider block">
                    Email Status
                  </span>
                  <span className="text-xs font-extrabold flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#0D1017] border-2 border-[#171717] dark:border-[#3D475E]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] block">
                    Account Created
                  </span>
                  <span className="text-xs font-mono font-bold text-[#171717] dark:text-[#F4F1E8] tabular-nums">
                    {new Date(selectedUser.creationTime).toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#0D1017] border-2 border-[#171717] dark:border-[#3D475E]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#525252] dark:text-[#9AA6BE] block">
                    Last Sign In
                  </span>
                  <span className="text-xs font-mono font-bold text-[#171717] dark:text-[#F4F1E8] tabular-nums">
                    {new Date(selectedUser.lastSignInTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="nb-btn nb-btn-primary px-6 py-2.5 rounded-xl text-xs font-extrabold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
