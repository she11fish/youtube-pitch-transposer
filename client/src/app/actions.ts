"use server";

export async function getPublicEnv() {
  if (process.env.NODE_ENV !== "production") return;
  const publicEnvVars = Object.keys(process.env)
    .filter((key) => key.startsWith("NEXT_PUBLIC_"))
    .reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {} as Record<string, string | undefined>);

  return { env: publicEnvVars };
}
