"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import { makePaymentRequest } from "@/api/payment";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CreditCard, ArrowLeft, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const { items, removeAll } = useCart();
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const prices = items.map((product) => product.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);

  const processPayment = async () => {
    // Verificar autenticación
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Necesitas estar autenticado para realizar el pago",
        variant: "destructive",
      });
      router.push("/auth?redirect=/cart");
      return;
    }

    // Verificar que hay productos en el carrito
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de proceder al pago",
        variant: "destructive",
      });
      return;
    }

    try {
      // Crear orden
      const res = await makePaymentRequest.post("/api/orders", {
        products: items,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Mostrar mensaje de éxito
      toast({
        title: "¡Orden creada exitosamente!",
        description: "Tu pago ha sido procesado",
      });

      // Limpiar carrito
      removeAll();

      // Redirigir a página de éxito
      if (res.data.paymentUrl) {
        router.push(res.data.paymentUrl);
      } else {
        router.push("/success");
      }
      
    } catch (error: any) {
      console.error('Error al procesar el pago:', error);
      
      if (error.response?.status === 401) {
        toast({
          title: "Sesión expirada",
          description: "Por favor, inicia sesión nuevamente",
          variant: "destructive",
        });
        router.push("/auth?redirect=/cart");
      } else {
        toast({
          title: "Error al procesar el pago",
          description: error.response?.data?.error || "Intenta nuevamente",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tu Carrito de Compras
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {items.length === 0
                ? "Tu carrito está vacío"
                : `Tienes ${items.length} producto${items.length === 1 ? "" : "s"} en tu carrito`}
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hay productos en tu carrito
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Explora nuestra tienda y encuentra productos increíbles
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
              >
                <ArrowLeft size={20} className="mr-2" />
                Volver a la tienda
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2">
                <AnimatePresence>
                  <motion.ul layout>
                    {items.map((item) => (
                      <CartItem key={item._id} product={item} />
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* Resumen de la orden */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm sticky top-4"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Resumen de la Orden
                  </h3>
                  <Separator className="mb-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Envío</span>
                      <span className="text-green-500">Gratis</span>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {!isAuthenticated ? (
                    <Button
                      onClick={() => router.push("/auth?redirect=/cart")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl flex items-center justify-center gap-2"
                    >
                      <LogIn size={20} />
                      Iniciar sesión para pagar
                    </Button>
                  ) : (
                    <Button
                      onClick={processPayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      Finalizar Compra
                    </Button>
                  )}

                  <button
                    onClick={() => router.push("/")}
                    className="w-full mt-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Continuar comprando
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
