import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Shop Smart with <span className="text-white">SNAGIT</span>
        </h1>
        <p className="text-gray-400 max-w-xl mb-6">
          Discover the best products at unbeatable prices. Quality you can
          trust.
        </p>
        {/* <AppButton>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Shop Now</span>
          </div>
        </AppButton> */}
      </section>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Home", "Accessories"].map((cat) => (
            <div
              key={cat}
              className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 cursor-pointer"
            >
              <p className="font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-800 rounded-xl p-4">
              <Image
                src="/logo.png"
                alt="product"
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <h3 className="mt-3 font-semibold">Product {item}</h3>
              <p className="text-gray-400 text-sm">₹999</p>
              {/* <AppButton>Add to Cart</AppButton> */}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-800 text-center py-12 mt-10">
        <h2 className="text-3xl font-bold mb-3">Big Sale is Live 🔥</h2>
        <p className="mb-4 text-gray-400">Up to 50% OFF on selected items</p>
        {/* <AppButton>Explore Now</AppButton> */}
      </section>
    </main>
  );
}
