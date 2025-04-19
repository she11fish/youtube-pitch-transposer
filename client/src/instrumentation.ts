import { init } from "@/lib/setting";

export function register() {
  if (process.env.NODE_ENV === "production") {
    init();
  }
}
