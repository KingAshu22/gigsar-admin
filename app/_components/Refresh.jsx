import { useRouter } from "next/navigation";

export const Refresh = () => {
  const router = useRouter();

  return router.refresh();
};
