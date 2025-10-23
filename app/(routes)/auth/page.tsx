import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bienvenido
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Accede a tu cuenta o crea una nueva
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
} 