import React, { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsRibbon } from './components/StatsRibbon';
import { FlowJourney } from './components/FlowJourney';
import { EcosystemCategories } from './components/EcosystemCategories';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ReviewsSection } from './components/ReviewsSection';
import { FounderSection } from './components/FounderSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { SearchSpotlightModal } from './components/SearchSpotlightModal';
import { ReviewModal } from './components/ReviewModal';
import { AppDashboard } from './components/AppDashboard';
import { AdminPortal } from './components/admin/AdminPortal';
import { INITIAL_STUDENT_REVIEWS } from './data';
import { StudentReview } from './types';
import { signInWithGoogle, logOut, subscribeToAuthChanges } from './firebase/auth';
import { checkUserRole, syncUserSession } from './firebase/firestoreService';
import { resetWelcomeSession } from './firebase/welcomeSession';
import { UniFlowLogo } from './components/UniFlowLogo';
import { AuthDomainModal } from './components/AuthDomainModal';
import { ThemeProvider } from './components/dashboard/ThemeSystem';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || '/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState<boolean | null>(null);
  const [adminCheckLoading, setAdminCheckLoading] = useState<boolean>(false);

  const [reviews, setReviews] = useState<StudentReview[]>(() => {
    const saved = localStorage.getItem('uniflow_student_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STUDENT_REVIEWS;
      }
    }
    return INITIAL_STUDENT_REVIEWS;
  });

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        syncUserSession(firebaseUser).catch((err) => {
          console.warn('[UniFlow] syncUserSession warning:', err);
        });
      } else {
        resetWelcomeSession();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (
        currentRoute === '/profile' ||
        currentRoute === '/reviews' ||
        currentRoute.startsWith('/profile/') ||
        currentRoute.startsWith('/reviews/')
      ) {
        const target = user ? '/app' : '/';
        window.history.replaceState({}, '', target);
        setCurrentRoute(target);
        return;
      }

      if (
        currentRoute === '/admin/profiles' ||
        currentRoute === '/admin/reviews' ||
        currentRoute.startsWith('/admin/profiles/') ||
        currentRoute.startsWith('/admin/reviews/')
      ) {
        const target = user ? '/admin' : '/';
        window.history.replaceState({}, '', target);
        setCurrentRoute(target);
        return;
      }

      if (currentRoute.startsWith('/app') && !user) {
        window.history.replaceState({}, '', '/');
        setCurrentRoute('/');
      } else if (currentRoute.startsWith('/admin')) {
        if (!user) {
          window.history.replaceState({}, '', '/');
          setCurrentRoute('/');
          setToastMessage({ text: 'Please sign in with Google to access the Admin Portal.', isError: true });
          setTimeout(() => setToastMessage(null), 5000);
        } else {
          setAdminCheckLoading(true);
          checkUserRole(user)
            .then((info) => {
              setIsAdminRole(info.isAdmin);
              setAdminCheckLoading(false);
              if (!info.isAdmin) {
                console.warn('[UniFlow Security] Unauthorized access attempt to /admin by', user.email);
                window.history.replaceState({}, '', '/app');
                setCurrentRoute('/app');
                setToastMessage({ text: 'Access Denied: You do not have administrator privileges.', isError: true });
                setTimeout(() => setToastMessage(null), 5000);
              }
            })
            .catch((err) => {
              console.error('[UniFlow] Admin role check failed:', err);
              setAdminCheckLoading(false);
              window.history.replaceState({}, '', '/app');
              setCurrentRoute('/app');
            });
        }
      }
    }
  }, [authLoading, user, currentRoute]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentRoute]);

  const authAttemptIdRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    const handleWindowFocus = () => {
      if (isSigningIn) {
        setIsSigningIn(false);
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isSigningIn]);

  const handleGoogleAuth = async () => {
    if (user) {
      navigateTo('/app');
      return;
    }

    const now = Date.now();
    if (now - lastClickTimeRef.current < 200) {
      return;
    }
    lastClickTimeRef.current = now;

    const currentAttemptId = ++authAttemptIdRef.current;
    setIsSigningIn(true);

    try {
      const result = await signInWithGoogle();

      if (authAttemptIdRef.current !== currentAttemptId) {
        return;
      }

      if (result.user) {
        setUser(result.user);
        navigateTo('/app');
        setToastMessage({ text: 'Welcome to UniFlow! Signed in successfully.' });
        setTimeout(() => setToastMessage(null), 4000);
      } else if (result.isUnauthorizedDomain) {
        setUnauthorizedDomain(result.domain || window.location.hostname);
        setIsDomainModalOpen(true);
      } else if (result.error) {
        setToastMessage({ text: result.error, isError: true });
        setTimeout(() => setToastMessage(null), 6000);
      }
    } catch {
      setToastMessage({
        text: 'Google sign-in could not be completed. Please try again.',
        isError: true,
      });
      setTimeout(() => setToastMessage(null), 6000);
    } finally {
      if (authAttemptIdRef.current === currentAttemptId) {
        setIsSigningIn(false);
      }
    }
  };

  const handleContinueDemo = () => {
    setIsDomainModalOpen(false);
    const demoUser = {
      uid: 'demo_user_preview',
      email: 'vishnukant.25bcon2366@jecrcu.edu.in',
      displayName: 'Vishnu Kant Sharma',
      photoURL: '',
      emailVerified: true,
      isAnonymous: false,
      tenantId: null,
      providerData: [
        {
          providerId: 'google.com',
          uid: 'demo_user_preview',
          displayName: 'Vishnu Kant Sharma',
          email: 'vishnukant.25bcon2366@jecrcu.edu.in',
          phoneNumber: null,
          photoURL: null,
        },
      ],
      getIdToken: async () => 'demo_token',
      getIdTokenResult: async () => ({
        token: 'demo_token',
        signInProvider: 'google.com',
        claims: { role: 'primaryAdmin', admin: true },
        authTime: 'now',
        issuedAtTime: 'now',
        expirationTime: 'later',
      }),
      reload: async () => {},
      toJSON: () => ({}),
    } as unknown as User;

    setUser(demoUser);
    navigateTo('/app');
    setToastMessage({ text: 'Entered UniFlow in Preview Demo Mode!' });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleLogout = async () => {
    resetWelcomeSession();
    await logOut();
    setUser(null);
    navigateTo('/');
    setToastMessage({ text: 'Signed out successfully. See you soon!' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddReview = (newReview: StudentReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('uniflow_student_reviews', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const renderToast = () =>
    toastMessage && (
      <div
        role="status"
        className={`fixed bottom-6 right-6 z-50 max-w-md rounded-xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-4 flex items-center justify-between gap-3 ${
          toastMessage.isError ? 'bg-[#FF8A65] text-[#171717]' : 'bg-[#B8F2E6] text-[#171717]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center shrink-0">
            {toastMessage.isError ? (
              <AlertCircle className="w-5 h-5 text-[#171717] stroke-[2.5]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#171717] stroke-[2.5]" />
            )}
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
              {toastMessage.isError ? 'Action Notice' : 'UniFlow Update'}
            </p>
            <p className="text-xs font-semibold text-[#171717] mt-0.5 leading-snug">
              {toastMessage.text}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setToastMessage(null)}
          className="w-8 h-8 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#FFD84D] transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    );

  // Auth & Admin Loading Screen
  if (
    (authLoading && (currentRoute.startsWith('/app') || currentRoute.startsWith('/admin'))) ||
    (adminCheckLoading && currentRoute.startsWith('/admin'))
  ) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] flex flex-col items-center justify-center p-6 font-sans">
        <div className="nb-card-lg rounded-2xl p-8 sm:p-10 bg-[#FFFFFF] dark:bg-[#161B26] flex flex-col items-center text-center max-w-sm w-full">
          <div className="w-14 h-14 rounded-xl bg-[#FFD84D] border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center mb-5">
            <div className="w-7 h-7 rounded-full border-[3px] border-[#171717] border-t-transparent animate-spin" />
          </div>
          <UniFlowLogo size="md" />
          <p className="text-sm font-bold text-[#404040] dark:text-[#9AA6BE] mt-4">
            {currentRoute.startsWith('/admin')
              ? 'Verifying administrator credentials...'
              : 'Verifying student session...'}
          </p>
        </div>
      </div>
    );
  }

  // Authenticated Protected Route: /admin
  if (currentRoute.startsWith('/admin') && user && isAdminRole) {
    return (
      <>
        <AdminPortal
          user={user}
          onReturnToDashboard={() => navigateTo('/app')}
          onLogout={handleLogout}
        />
        {renderToast()}
      </>
    );
  }

  // Authenticated Protected Route: /app
  if (currentRoute.startsWith('/app') && user) {
    return (
      <>
        <AppDashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />
        {renderToast()}
      </>
    );
  }

  // Public Landing Page: /
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FFFDF5] dark:bg-[#0D1017] text-[#171717] dark:text-[#F4F1E8] selection:bg-[#FFD84D] selection:text-[#171717] relative font-sans transition-colors duration-200 overflow-x-hidden">
        <ParticleCanvas />

        <Navbar
          onOpenAuth={handleGoogleAuth}
          onOpenSearch={() => setIsSearchOpen(true)}
          isSigningIn={isSigningIn}
        />

        <main className="relative z-10">
          <div className="scroll-reveal is-visible">
            <HeroSection
              onOpenAuth={handleGoogleAuth}
              onOpenSearch={() => setIsSearchOpen(true)}
              isSigningIn={isSigningIn}
            />
          </div>

          <div className="scroll-reveal">
            <StatsRibbon />
          </div>

          <div className="scroll-reveal">
            <EcosystemCategories onOpenAuth={handleGoogleAuth} />
          </div>

          <div className="scroll-reveal">
            <FlowJourney />
          </div>

          <div className="scroll-reveal">
            <FeaturesGrid />
          </div>

          <div className="scroll-reveal">
            <ReviewsSection
              reviews={reviews}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          </div>

          <div className="scroll-reveal">
            <FounderSection />
          </div>

          <div className="scroll-reveal">
            <FinalCta onOpenAuth={handleGoogleAuth} isSigningIn={isSigningIn} />
          </div>
        </main>

        <Footer />

        <SearchSpotlightModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmitReview={handleAddReview}
        />

        <AuthDomainModal
          isOpen={isDomainModalOpen}
          domain={unauthorizedDomain}
          onClose={() => setIsDomainModalOpen(false)}
          onRetry={() => {
            setIsDomainModalOpen(false);
            handleGoogleAuth();
          }}
          onContinueDemo={handleContinueDemo}
        />

        {renderToast()}
      </div>
    </ThemeProvider>
  );
}
