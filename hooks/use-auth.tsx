import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from '@/components/ui/use-toast';
import { UserType, LoginData, RegisterData, UpdateProfileData } from '@/types/user';

interface AuthStore {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  
  // Acciones
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      login: async (data: LoginData): Promise<boolean> => {
        try {
          set({ isLoading: true });
          
          const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          // Verificar si la respuesta es JSON antes de parsear
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(
              response.status === 404 
                ? 'El servidor no está disponible. Verifica que el backend esté corriendo.'
                : `El servidor devolvió una respuesta inesperada (${response.status}). Verifica la configuración del backend.`
            );
          }

          const result = await response.json();

          if (!response.ok) {
            const error = new Error(result.error || 'Error en el login');
            (error as any).details = result.details;
            throw error;
          }

          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast({
            title: "¡Bienvenido! 👋",
            description: `Hola ${result.user.name}`,
          });

          return true;
        } catch (error: any) {
          set({ isLoading: false });
          
          // Manejar errores de red
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            toast({
              title: "Error de conexión",
              description: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
              variant: "destructive",
            });
            return false;
          }
          
          // Extraer mensajes específicos de details si están disponibles
          let errorMessage = error.message;
          if (error.details && Array.isArray(error.details) && error.details.length > 0) {
            const specificMessages = error.details.map((detail: any) => detail.msg).join(', ');
            errorMessage = specificMessages;
          }
          
          toast({
            title: "Error en el login",
            description: errorMessage,
            variant: "destructive",
          });
          return false;
        }
      },

      register: async (data: RegisterData): Promise<boolean> => {
        try {
          set({ isLoading: true });
          
          const response = await fetch(`${API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          // Verificar si la respuesta es JSON antes de parsear
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(
              response.status === 404 
                ? 'El servidor no está disponible. Verifica que el backend esté corriendo.'
                : `El servidor devolvió una respuesta inesperada (${response.status}). Verifica la configuración del backend.`
            );
          }

          const result = await response.json();

          if (!response.ok) {
            const error = new Error(result.error || 'Error en el registro');
            (error as any).details = result.details;
            throw error;
          }

          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast({
            title: "¡Cuenta creada exitosamente! 🎉",
            description: `Bienvenido ${result.user.name}`,
          });

          return true;
        } catch (error: any) {
          set({ isLoading: false });
          
          // Manejar errores de red
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            toast({
              title: "Error de conexión",
              description: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
              variant: "destructive",
            });
            return false;
          }
          
          // Extraer mensajes específicos de details si están disponibles
          let errorMessage = error.message;
          if (error.details && Array.isArray(error.details) && error.details.length > 0) {
            const specificMessages = error.details.map((detail: any) => detail.msg).join(', ');
            errorMessage = specificMessages;
          }
          
          toast({
            title: "Error en el registro",
            description: errorMessage,
            variant: "destructive",
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente",
        });
      },

      updateProfile: async (data: UpdateProfileData): Promise<boolean> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No hay token de autenticación');
          }

          const response = await fetch(`${API_URL}/api/users/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          // Verificar si la respuesta es JSON antes de parsear
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(
              response.status === 404 
                ? 'El servidor no está disponible. Verifica que el backend esté corriendo.'
                : `El servidor devolvió una respuesta inesperada (${response.status}). Verifica la configuración del backend.`
            );
          }

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Error al actualizar perfil');
          }

          set({
            user: result.user,
            isLoading: false,
          });

          toast({
            title: "Perfil actualizado",
            description: "Tu perfil se ha actualizado exitosamente",
          });

          return true;
        } catch (error: any) {
          set({ isLoading: false });
          
          // Manejar errores de red
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            toast({
              title: "Error de conexión",
              description: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
              variant: "destructive",
            });
            return false;
          }
          
          toast({
            title: "Error al actualizar perfil",
            description: error.message,
            variant: "destructive",
          });
          return false;
        }
      },

      deleteAccount: async (): Promise<boolean> => {
        try {
          set({ isLoading: true });
          const { token } = get();
          
          if (!token) {
            throw new Error('No hay token de autenticación');
          }

          const response = await fetch(`${API_URL}/api/users/account`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          // Verificar si la respuesta es JSON antes de parsear (solo si hay contenido)
          if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const result = await response.json();
              throw new Error(result.error || 'Error al eliminar cuenta');
            } else {
              throw new Error(
                response.status === 404 
                  ? 'El servidor no está disponible. Verifica que el backend esté corriendo.'
                  : `Error al eliminar cuenta (${response.status})`
              );
            }
          }

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });

          toast({
            title: "Cuenta eliminada",
            description: "Tu cuenta ha sido eliminada exitosamente",
          });

          return true;
        } catch (error: any) {
          set({ isLoading: false });
          
          // Manejar errores de red
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            toast({
              title: "Error de conexión",
              description: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
              variant: "destructive",
            });
            return false;
          }
          
          toast({
            title: "Error al eliminar cuenta",
            description: error.message,
            variant: "destructive",
          });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
); 