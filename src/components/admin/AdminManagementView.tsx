import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Mail,
  Key,
  Lock,
  ShieldX,
  Info,
  X,
} from 'lucide-react';
import { AdminRecord } from '../../types';
import {
  fetchAdminsList,
  addSecondaryAdminApi,
  removeSecondaryAdminApi,
  PRIMARY_ADMIN_EMAIL,
} from '../../firebase/firestoreService';

interface AdminManagementViewProps {
  currentUser: User;
  isPrimaryAdmin: boolean;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  currentUser,
  isPrimaryAdmin,
}) => {
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');
  const [grantState, setGrantState] = useState<
    'idle' | 'granting' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [adminToRevoke, setAdminToRevoke] = useState<string | null>(null);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const loadAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminsList(currentUser);
      setAdmins(data);
    } catch (err: any) {
      console.error('[UniFlow] Error loading admins list:', err);
      setError(err.message || 'Failed to load administrator accounts.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const handleAddSecondary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !isPrimaryAdmin || grantState === 'granting')
      return;

    const emailToAdd = newAdminEmail.trim().toLowerCase();

    setGrantState('granting');
    setMessage(null);

    const timeoutTimer = setTimeout(() => {
      setGrantState((curr) => {
        if (curr === 'granting') {
          setMessage({
            type: 'error',
            text: 'Request timed out after 10 seconds. Please verify network connection and retry.',
          });
          return 'error';
        }
        return curr;
      });
    }, 10000);

    try {
      const res = await addSecondaryAdminApi(emailToAdd, currentUser);
      clearTimeout(timeoutTimer);

      if (res.success) {
        setGrantState('success');
        setMessage({
          type: 'success',
          text:
            res.message || `Granted Secondary Admin access to ${emailToAdd}`,
        });
        setNewAdminEmail('');

        if (res.admin) {
          setAdmins((prev) => {
            const exists = prev.some(
              (a) => a.email.toLowerCase() === emailToAdd
            );
            if (exists) return prev;
            return [...prev, res.admin!];
          });
        } else {
          loadAdmins();
        }
      } else {
        setGrantState('error');
        setMessage({
          type: 'error',
          text: res.message || 'Failed to add secondary admin',
        });
      }
    } catch (err: any) {
      clearTimeout(timeoutTimer);
      setGrantState('error');
      setMessage({
        type: 'error',
        text: err.message || 'Error occurred while adding admin',
      });
    }
  };

  const confirmRevokeSecondary = async () => {
    if (!adminToRevoke || !isPrimaryAdmin) return;
    const email = adminToRevoke;

    if (email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      setMessage({
        type: 'error',
        text: 'The Primary Admin cannot be removed or demoted.',
      });
      setAdminToRevoke(null);
      return;
    }

    setIsRevoking(true);
    try {
      const res = await removeSecondaryAdminApi(email, currentUser);
      if (res.success) {
        setMessage({
          type: 'success',
          text: `Revoked Secondary Admin access for ${email}`,
        });
        setAdmins((prev) =>
          prev.filter((a) => a.email.toLowerCase() !== email.toLowerCase())
        );
      } else {
        setMessage({
          type: 'error',
          text: res.message || 'Failed to revoke admin access',
        });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Error revoking admin',
      });
    } finally {
      setIsRevoking(false);
      setAdminToRevoke(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight flex items-center gap-2.5 text-[#171717] dark:text-[#F4F1E8]">
            <span className="w-10 h-10 rounded-xl bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </span>
            <span>Administrator Access &amp; Hierarchy</span>
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] mt-1.5">
            Manage administrative credentials, secondary roles, and authorization boundaries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAdmins}
          className="nb-btn nb-btn-white px-4 py-2.5 rounded-xl text-xs font-extrabold self-start sm:self-auto"
        >
          <RefreshCw
            className={`w-4 h-4 stroke-[2.5] ${loading ? 'animate-spin' : ''}`}
          />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Grant Secondary Admin Card */}
      {isPrimaryAdmin ? (
        <div className="nb-card-lg rounded-2xl p-5 sm:p-6 bg-[#C9B6FF] text-[#171717] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display">
                Assign Secondary Admin
              </h3>
              <p className="text-xs font-semibold text-[#171717]/80">
                Enter any student&rsquo;s authorized Google email to grant Secondary Admin access.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleAddSecondary}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#171717] stroke-[2.5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="colleague@gmail.com"
                className="nb-input w-full pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={grantState === 'granting' || !newAdminEmail.trim()}
              className="nb-btn nb-btn-primary px-6 py-3 rounded-xl text-xs sm:text-sm font-black disabled:opacity-50"
            >
              {grantState === 'granting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin stroke-[2.5]" />
                  <span>Granting...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>Grant Secondary Admin</span>
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`p-3.5 rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] text-xs font-extrabold flex items-center gap-2 text-[#171717] ${
                message.type === 'success' ? 'bg-[#B8F2E6]' : 'bg-[#FF6B6B]'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 stroke-[2.5] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 stroke-[2.5] shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="nb-card rounded-2xl p-4 bg-[#FFD84D] text-[#171717] flex items-start gap-3 text-xs font-semibold">
          <Info className="w-5 h-5 stroke-[2.5] shrink-0 mt-0.5" />
          <div>
            <span className="font-black">Secondary Admin Session:</span> You
            have view privileges over administrator listings, student profiles,
            and reviews. Role assignment and revocations are restricted to the
            Primary Admin ({PRIMARY_ADMIN_EMAIL}).
          </div>
        </div>
      )}

      {/* Active Administrators Roster */}
      <div className="nb-card-lg rounded-2xl p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#161B26] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#171717]/15 dark:border-[#2B3347] pb-4">
          <h3 className="text-lg font-black font-display tracking-tight flex items-center gap-2 text-[#171717] dark:text-[#F4F1E8]">
            <Lock className="w-4 h-4 stroke-[2.5]" />
            <span>Current Authorized Administrators</span>
          </h3>
          <span className="px-3 py-1 rounded-lg bg-[#FFF7DC] text-[#171717] border-2 border-[#171717] text-xs font-mono font-extrabold tabular-nums">
            {admins.length} Total Account{admins.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div className="py-10 text-center flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#171717] dark:text-[#FFD84D] animate-spin stroke-[2.5]" />
            <p className="text-xs font-bold text-[#525252] dark:text-[#9AA6BE]">
              Loading administrators...
            </p>
          </div>
        ) : error ? (
          <div className="py-6 text-center space-y-2">
            <AlertCircle className="w-6 h-6 mx-auto text-[#FF6B6B] stroke-[2.5]" />
            <p className="text-xs font-extrabold text-[#171717] dark:text-[#F4F1E8]">
              {error}
            </p>
            <button
              type="button"
              onClick={loadAdmins}
              className="nb-btn-sm px-3 py-1.5 rounded-lg bg-[#FFD84D] text-[#171717] text-xs font-extrabold cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {admins.map((adm) => {
              const isPrimary =
                adm.role === 'primaryAdmin' ||
                adm.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();

              return (
                <div
                  key={adm.id || adm.email}
                  className="p-4 rounded-xl bg-[#FFFDF5] dark:bg-[#0D1017] border-2 border-[#171717] dark:border-[#3D475E] shadow-[3px_3px_0px_#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl border-2 border-[#171717] flex items-center justify-center shrink-0 text-[#171717] ${
                        isPrimary ? 'bg-[#FFD84D]' : 'bg-[#C9B6FF]'
                      }`}
                    >
                      {isPrimary ? (
                        <Key className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black font-mono text-[#171717] dark:text-[#F4F1E8] break-all">
                          {adm.email}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border-2 border-[#171717] text-[#171717] ${
                            isPrimary ? 'bg-[#FFD84D]' : 'bg-[#C9B6FF]'
                          }`}
                        >
                          {isPrimary
                            ? 'Primary Admin (Master)'
                            : 'Secondary Admin'}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-[#525252] dark:text-[#9AA6BE] mt-1">
                        Added by {adm.addedBy} &bull;{' '}
                        {new Date(adm.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {isPrimaryAdmin && !isPrimary && (
                    <button
                      type="button"
                      onClick={() => setAdminToRevoke(adm.email)}
                      className="nb-btn nb-btn-danger px-3.5 py-2 rounded-xl text-xs font-extrabold self-start sm:self-auto"
                      title={`Revoke access for ${adm.email}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Revoke Access</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Revoking Access */}
      {adminToRevoke && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/75"
          onClick={() => !isRevoking && setAdminToRevoke(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="nb-modal w-full max-w-sm rounded-2xl bg-[#FFFDF5] dark:bg-[#161B26] p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b-2 border-[#171717]/15 dark:border-[#2B3347] pb-3">
              <div className="flex items-center gap-2 text-[#171717] dark:text-[#F4F1E8]">
                <span className="w-8 h-8 rounded-lg bg-[#FF6B6B] text-[#171717] border-2 border-[#171717] flex items-center justify-center">
                  <ShieldX className="w-4 h-4 stroke-[2.5]" />
                </span>
                <h3 className="text-base font-black font-display">
                  Revoke Admin Access
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAdminToRevoke(null)}
                className="nb-btn-sm p-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] cursor-pointer"
                aria-label="Close confirmation modal"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#171717] dark:text-[#F4F1E8] leading-relaxed">
              Are you sure you want to remove Secondary Admin privileges for{' '}
              <span className="px-1.5 py-0.5 rounded bg-[#FFD84D] text-[#171717] border border-[#171717] font-mono font-bold">
                {adminToRevoke}
              </span>
              ? They will immediately lose access to the Admin Portal.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAdminToRevoke(null)}
                disabled={isRevoking}
                className="nb-btn nb-btn-white px-4 py-2 rounded-xl text-xs font-extrabold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRevokeSecondary}
                disabled={isRevoking}
                className="nb-btn nb-btn-danger px-4 py-2 rounded-xl text-xs font-extrabold"
              >
                {isRevoking ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin stroke-[2.5]" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>Confirm Revoke</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
