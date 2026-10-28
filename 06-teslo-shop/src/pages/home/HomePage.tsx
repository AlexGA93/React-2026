import blackBackpack from "@/assets/product-black-backpack.jpg";
import blackJacket from "@/assets/product-black-jacket.jpg";
import blackTshirt from "@/assets/product-black-tshirt.jpg";
import greySweatshirt from "@/assets/product-grey-sweatshirt.jpg";
import whiteCap from "@/assets/product-white-cap.jpg";
import whiteHoodie from "@/assets/product-white-hoodie.jpg";
import heroImage from "@/assets/hero.png";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { ArrowDown, ArrowRight, RefreshCw } from "lucide-react";

const collections = [
  { name: "Graphic tees", detail: "Everyday essentials", image: blackTshirt },
  { name: "Outerwear", detail: "Made to move", image: blackJacket },
  { name: "Sweatshirts", detail: "Comfort, considered", image: greySweatshirt },
  { name: "Hoodies", detail: "A softer layer", image: whiteHoodie },
  { name: "Accessories", detail: "The finishing touch", image: whiteCap },
  { name: "Bags", detail: "Carry it forward", image: blackBackpack },
];

export const HomePage = () => {
  const { data, isLoading, isError, refetch } = useProducts();

  return (
    <main>
      <section className="overflow-hidden bg-[#f4f2ef]">
        <div className="container mx-auto grid min-h-[520px] items-center gap-8 px-6 py-16 md:grid-cols-2 md:px-10 lg:min-h-[620px] lg:px-16">
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Teslo essentials · 2026
            </p>
            <h1 className="font-montserrat text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              Designed for
              <br />
              the everyday.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Thoughtful pieces, clean lines, and a little more room to move.
              Meet the new Teslo collection.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-black/80"
              >
                Shop the collection <ArrowRight aria-hidden="true" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
              >
                Explore the edit <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full bg-white/80 blur-3xl"
            />
            <img
              src={heroImage}
              alt=""
              className="relative z-10 w-full max-w-130 object-contain"
            />
            <p className="absolute bottom-5 right-0 text-right text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Form follows function
              <br />
              Collection no. 01
            </p>
          </div>
        </div>
      </section>

      <section
        id="collections"
        className="container mx-auto px-6 pb-10 pt-16 md:px-10 lg:px-16 lg:pt-24"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              The collection
            </p>
            <h2 className="font-montserrat text-3xl font-medium tracking-tight sm:text-4xl">
              Find your uniform.
            </h2>
          </div>
          <a
            href="#catalog"
            className="hidden items-center gap-2 pb-1 text-sm font-medium sm:inline-flex"
          >
            View all <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.name}
              href="#catalog"
              className={`group relative overflow-hidden bg-[#f4f2ef] ${
                index === 0 || index === 5 ? "sm:col-span-1" : ""
              }`}
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-4 pb-4 pt-12 text-white sm:px-5 sm:pb-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                  {collection.detail}
                </p>
                <h3 className="mt-1 text-base font-medium sm:text-lg">
                  {collection.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="catalog" className="scroll-mt-20 pt-8">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Shop Teslo
          </p>
          <h2 className="font-montserrat text-3xl font-medium tracking-tight sm:text-4xl">
            The latest edit.
          </h2>
        </div>

        {isLoading ? (
          <div
            role="status"
            className="flex min-h-64 flex-col items-center justify-center gap-4 text-muted-foreground"
          >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <p>Loading the collection…</p>
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="mx-auto flex min-h-64 max-w-xl flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <p className="text-lg font-medium">We couldn’t load the collection.</p>
            <p className="text-sm text-muted-foreground">
              Check your connection and try again.
            </p>
            <Button variant="outline" onClick={() => void refetch()}>
              <RefreshCw aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : data?.products.length ? (
          <>
            <ProductsGrid products={data.products} />
            {data.pages > 1 && <CustomPagination totalPages={data.pages} />}
          </>
        ) : (
          <p className="px-6 py-20 text-center text-muted-foreground">
            There are no products to show right now.
          </p>
        )}
      </section>
    </main>
  );
};
