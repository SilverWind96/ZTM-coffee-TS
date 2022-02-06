import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const { id } = useRouter().query;
  return (
    <div>
      {id}{" "}
      <Link href={"/"}>
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
