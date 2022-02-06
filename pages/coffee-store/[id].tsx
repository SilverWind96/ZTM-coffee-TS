import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const { id } = useRouter().query;
  return (
    <div>
      {id} <Link href={"/"}>Back to home</Link>
    </div>
  );
};

export default CoffeeStore;
