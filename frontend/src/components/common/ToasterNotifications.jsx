import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export default function ToasterNotifications({
  limit = 3,
  position = "top-right",
  reverseOrder = false,
}) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= limit)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, limit]);

  return <Toaster position={position} reverseOrder={reverseOrder} />;
}
