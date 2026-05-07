import type { CartItem } from "@/context/CartContext";

export const buildCheckoutMessage = (items: CartItem[], totalText: string) => {
  const lines = [
    "Halo Tinspedia, saya mau order:",
    "",
    ...items.map(
      (i, idx) =>
        `${idx + 1}. ${i.productName} - ${i.variantLabel} (${i.price})${
          i.qty > 1 ? ` x${i.qty}` : ""
        }${i.note ? ` [${i.note}]` : ""}`
    ),
    "",
    `Total: ${totalText}`,
    "",
    "Mohon info pembayaran. Terima kasih!",
  ];
  return lines.join("\n");
};