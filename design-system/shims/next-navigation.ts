// Design-system build only — aliased in place of next/navigation.
// Header reads usePathname() just to decide which nav link looks "active";
// outside a real Next.js App Router there's no route, so we report the home route.
export function usePathname(): string {
  return "/";
}
