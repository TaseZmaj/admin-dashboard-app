function capitalize(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function normalizePathname(pathname: string) {
  return capitalize(pathname.slice(1).replace("-", " "));
}
function formatPrice(price: number) {
  const parts = String(price).toString().split(".");
  const integerPart = parts[0];

  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits

  return `${formatted},00`;
}

export { capitalize, normalizePathname, formatPrice };
