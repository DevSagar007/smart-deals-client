import { Suspense } from "react";
import LatestProducts from "../../LatestProducts/LatestProducts";

function Home() {
  const latestProductsPromise = fetch(
    "http://localhost:3000/latest-products",
  ).then((res) => res.json());

  return (
    <>
      <div className="bg-primary">This is home</div>
      <Suspense fallback={<p className="center">Loading...</p>}>
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </>
  );
}

export default Home;
