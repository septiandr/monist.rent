export function formatIDR(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}/bln`;
}
