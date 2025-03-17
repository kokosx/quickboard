import { getSession } from "../lib/auth";
import LoginModal from "./_components/LoginModal";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <p>{session?.user.name}</p>
      <LoginModal />
    </>
  );
}
