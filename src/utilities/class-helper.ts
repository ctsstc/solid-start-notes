export function classHelper(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
