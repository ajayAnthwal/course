import { RegisterForm } from "@/features/auth";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-200px)] flex rounded-2xl overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-md text-center text-white p-8">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold mb-4 text-white">Your Future Starts Here</h2>
          <p className="text-secondary-200/80 leading-relaxed mb-8 text-white">
            Create your free account and unlock access to India&apos;s most comprehensive education platform. Compare colleges, track applications, and get expert guidance.
          </p>
          <div className="space-y-3 text-left">
            {[
              "Personalized college recommendations",
              "Application tracking dashboard",
              "Expert counseling sessions",
              "Compare up to 4 colleges side by side",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 transition-shadow">
              <span className="text-white font-bold text-sm">EP</span>
            </div>
            <span className="text-xl font-bold text-white">EduPortal</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-white">
              Join thousands of students finding their dream college
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-bg-elevated text-sm font-medium text-text-secondary hover:bg-bg-muted transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-bg-elevated text-sm font-medium text-text-secondary hover:bg-bg-muted transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-bg px-4 text-text-muted">or continue with email</span>
            </div>
          </div>

          {/* Register Form */}
          <div className="bg-bg-elevated rounded-2xl border border-border p-6 shadow-sm">
            <RegisterForm />
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            By creating an account, you agree to our{" "}
            <Link href="#" className="text-primary-600 hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="text-primary-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
