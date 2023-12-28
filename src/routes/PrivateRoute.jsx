import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!user?.email && !isAuthenticated) {
      router.push("sign-in", undefined, { shallow: true });
      return null;
    }
  }, [isAuthenticated, router, user?.email, isLoading]);

  return children;
}
