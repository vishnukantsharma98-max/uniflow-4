import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { ThemeProvider } from '../dashboard/ThemeSystem';
import { UniFlowLogo } from '../UniFlowLogo';
import { AdminUsersDirectory } from './AdminUsersDirectory';
import { AdminManagementView } from './AdminManagementView';
import {
  checkUserRole,
  fetchAdminUsers,
  fetchAdminsList,
} from '../../firebase/firestoreService';

interface AdminPortalProps {
  user: User;
  onReturnToDashboard: () => void;
  onLogout: () => void;
}

export type AdminTab = 'overview' | 'users' | 'admins';

const AdminPortalContent: React.FC<AdminPortalProps> = ({
  user,
  onReturnToDashboard,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [roleInfo, setRoleInfo] = useState<{
    role: string;
    isPrimaryAdmin: boolean;
    isSecondaryAdmin: boolean;
    isAdmin: boolean;
  }>({
    role: 'user',
    isPrimaryAdmin: false,
    isSecondaryAdmin: false,
    isAdmin: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(1);

  useEffect(() => {
    checkUserRole(user).then((info) => {
      setRoleInfo(info);
    });

    fetchAdminUsers(user)
      .then((usersList) => {
        setUserCount(usersList.length);
      })
      .catch(() => {});

    fetchAdminsList(user)
      .then((adminsList) => {
        setAdminCount(adminsList.length);
      })
      .catch(() => {});
  }, [user]);

  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Admin Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'users' as AdminTab,
      label: 'Auth Users Directory',
      icon: Users,
      badge: userCount > 0 ? userCount : undefined,
    },
    {
      id: 'admins' as AdminTab,
      label: 'Admin Management',
      icon: ShieldCheck,
      badge: adminCount > 0 ? adminCount : undefined,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col min-[1200px]:flex-row bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] antialiased">
      {/* 1. Desktop Admin Sidebar */}
      <aside className="hidden min-[1200px]:flex flex-col justify-between shrink-0 w-72 h-screen sticky top-0 bg-[#FFFFFF] dark:bg-[#161B26] border-r-[3px] border-[#171717] dark:border-[#3D475E] z-40 p-5">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={onReturnToDashboard}
              title="Return to Student Dashboard (Home)"
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <UniFlowLogo size="md" showText={false} />
              <div className="flex flex-col">
                <span className="font-black font-display tracking-tight text-lg leading-none">
                  UniFlow
                </span>
                <span className="mt-1 inline-block px-2 py-0.5 rounded bg-[#FFD84D] text-[#171717] border-2 border-[#171717] text-[10px] font-mono font-black tracking-wider">
                  ADMIN PORTAL
                </span>
              </div>
            </button>
          </div>

          {/* Admin Identity Card */}
          <div className="p-3.5 rounded-xl bg-[#FFF7DC] dark:bg-[#1E2534] border-2 border-[#171717] dark:border-[#3D475E] shadow-[3px_3px_0px_#171717] flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg border-2 border-[#171717] flex items-center justify-center shrink-0 text-[#171717] ${
                roleInfo.isPrimaryAdmin ? 'bg-[#FFD84D]' : 'bg-[#C9B6FF]'
              }`}
            >
              {roleInfo.isPrimaryAdmin ? (
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-xs font-black truncate block text-[#171717] dark:text-[#F4F1E8]">
                {user.displayName || 'Administrator'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#525252] dark:text-[#9AA6BE] truncate block">
                {roleInfo.isPrimaryAdmin ? 'Primary Admin' : 'Secondary Admin'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717]'
                      : 'bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] border-[#171717]/25 dark:border-[#2B3347] hover:border-[#171717] dark:hover:border-[#FFD84D] hover:bg-[#FFF7DC] dark:hover:bg-[#232B3D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-black bg-[#FFFDF5] text-[#171717] border-2 border-[#171717] tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2.5 pt-4 border-t-2 border-[#171717] dark:border-[#3D475E]">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="nb-btn nb-btn-white w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Student Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="nb-btn nb-btn-danger w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Top Navbar for Admin */}
      <header className="min-[1200px]:hidden flex items-center justify-between p-3.5 bg-[#FFFFFF] dark:bg-[#161B26] border-b-[3px] border-[#171717] dark:border-[#3D475E] sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <UniFlowLogo size="sm" showText={false} />
          <span className="font-black font-display text-sm tracking-tight">
            Admin Portal
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="nb-btn-sm px-3 py-1.5 rounded-lg text-xs font-extrabold bg-[#FFD84D] text-[#171717] cursor-pointer"
          >
            Exit Admin
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nb-btn-sm p-2 rounded-lg bg-[#FFFDF5] text-[#171717] cursor-pointer"
            aria-label="Toggle Admin Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="min-[1200px]:hidden fixed inset-x-0 top-[62px] z-50 bg-[#FFFFFF] dark:bg-[#161B26] border-b-[3px] border-[#171717] dark:border-[#3D475E] shadow-[0_6px_0px_#171717] p-4 space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-extrabold border-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFD84D] text-[#171717] border-[#171717] shadow-[3px_3px_0px_#171717]'
                    : 'bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] border-[#171717]/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-black bg-[#FFFDF5] text-[#171717] border-2 border-[#171717] tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onLogout}
            className="nb-btn nb-btn-danger w-full py-2.5 rounded-xl text-xs font-extrabold mt-2"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* 3. Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overview Hero */}
            <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#FFD84D] text-[#171717]">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
                Control Center
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display">
                Administrator Control Center
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#171717]/80 mt-1 max-w-2xl">
                Overview of authorized administrators, user authentication directory, and platform security.
              </p>
            </div>

            {/* Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stat 1: Auth User Directory */}
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#8EC5FF] text-[#171717] text-left space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Auth Users Directory
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center">
                    <Users className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t-2 border-[#171717]">
                  <span className="text-4xl font-black font-mono tabular-nums">
                    {userCount}
                  </span>
                  <span className="text-xs font-extrabold uppercase group-hover:underline">
                    Inspect Directory &rarr;
                  </span>
                </div>
              </button>

              {/* Stat 2: Active Admins */}
              <button
                type="button"
                onClick={() => setActiveTab('admins')}
                className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#C9B6FF] text-[#171717] text-left space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Administrators
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t-2 border-[#171717]">
                  <span className="text-4xl font-black font-mono tabular-nums">
                    {adminCount}
                  </span>
                  <span className="text-xs font-extrabold uppercase group-hover:underline">
                    Manage Roles &rarr;
                  </span>
                </div>
              </button>

              {/* Stat 3: Your Privileges */}
              <button
                type="button"
                onClick={() => setActiveTab('admins')}
                className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#B8F2E6] text-[#171717] text-left space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Your Privileges
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FFFDF5] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-2 pt-2 border-t-2 border-[#171717]">
                  <span className="text-xl font-black font-display">
                    {roleInfo.isPrimaryAdmin
                      ? 'Primary Master Admin'
                      : 'Secondary Admin'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#FFFDF5] border-2 border-[#171717] text-[10px] font-extrabold uppercase shrink-0">
                    {roleInfo.isPrimaryAdmin ? 'Full Control' : 'Authorized'}
                  </span>
                </div>
              </button>
            </div>

            {/* Operational Management Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-left space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between border-b-2 border-[#171717]/15 dark:border-[#2B3347] pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#8EC5FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                        User Directory
                      </h3>
                      <p className="text-xs font-semibold text-[#525252] dark:text-[#9AA6BE]">
                        Inspect authenticated accounts &amp; sign-in providers
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed">
                  Access live Firebase Authentication user records, inspect account creation dates, verify Google account linking, and audit system users.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('admins')}
                className="group nb-card-lg nb-card-interactive rounded-2xl p-6 bg-[#FFFFFF] dark:bg-[#161B26] text-left space-y-4 cursor-pointer"
              >
                <div className="flex items-center justify-between border-b-2 border-[#171717]/15 dark:border-[#2B3347] pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#C9B6FF] text-[#171717] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black font-display text-[#171717] dark:text-[#F4F1E8]">
                        Admin Delegation &amp; Roles
                      </h3>
                      <p className="text-xs font-semibold text-[#525252] dark:text-[#9AA6BE]">
                        Grant or revoke Secondary Admin privileges
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFD84D] text-[#171717] border-2 border-[#171717] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#9AA6BE] leading-relaxed">
                  Authorize trusted team members as Secondary Administrators with Firestore Cloud persistence and instant role synchronization.
                </p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && <AdminUsersDirectory currentUser={user} />}
        {activeTab === 'admins' && (
          <AdminManagementView
            currentUser={user}
            isPrimaryAdmin={roleInfo.isPrimaryAdmin}
          />
        )}
      </main>
    </div>
  );
};

export const AdminPortal: React.FC<AdminPortalProps> = (props) => {
  return (
    <ThemeProvider>
      <AdminPortalContent {...props} />
    </ThemeProvider>
  );
};
