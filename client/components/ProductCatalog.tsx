import React from "react";
import { X } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface ProductCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductCatalog({ isOpen, onClose }: ProductCatalogProps) {
  if (!isOpen) return null;

  // Sample product data based on the Figma design
  const topBodyProducts = [
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "1050 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/98814441155c183a06abd6b56f9ad3dfceafdef9?width=334",
    },
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "1050 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/110a9e3edaf479429ddd010448c9dc8af7ebbfa5?width=334",
    },
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "800 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/26a8142aeacb123fc7bf71304521a1ea4e4e80d6?width=334",
    },
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "750 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/2f425b8d15513578e457e1083cda9bc8557bc17d?width=334",
    },
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "2500 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/39c74b18afde264bf109b89ed121022ffacc7c3f?width=334",
    },
    {
      title: "ФУТБОЛКА З ПРИНТОМ ПЕРСИК",
      price: "1050 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/9b852e39e46dacda8bd0cc426e7c76e9afe4aafa?width=334",
    },
  ];

  const bottomBodyProducts = [
    {
      title: "ДЖИНСИ З ВИШИВКОЮ ТА СМУГАМИ",
      price: "2550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/bba897ecdc4714d0d0bd93aa201d6b16435c74c9?width=334",
    },
    {
      title: "ШТАНИ ЗІ 100% ЛЬОНУ",
      price: "1250 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/86bdb43c82d3070066f36eded71d260588afa57b?width=334",
    },
    {
      title: "ДЖИНСОВІ ШОРТИ-БЕРМУДИ BAGGY FIT",
      price: "1050 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ede759f6a9042a70eb74949c972730e88d49b401?width=334",
    },
    {
      title: "ДЖИНСИ TAPERED WIDE FIT",
      price: "1550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/001b7c19c35543e44ef901f11008c6697858ee74?width=334",
    },
    {
      title: "ДЖИНСИ SLIM FIT",
      price: "1450 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a006a06c1388d0127012b72e2cd520b20456b43e?width=331",
    },
    {
      title: "ДЖИНСИ SLIM FIT",
      price: "1050 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/972789480e8ed0b3bf5ef4297fc277033a8635eb?width=334",
    },
  ];

  const shoesProducts = [
    {
      title: "ТРИКОТАЖНІ ЕСПАДРИЛЬЇ",
      price: "2550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5a45805db70518abdeafefb65ac7881d6c59c7f0?width=355",
    },
    {
      title: "БАЗОВІ КЕДИ",
      price: "2550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/09f2ae585a67a39ed68a4abebe13e553b4c73de4?width=355",
    },
    {
      title: "ШКІРЯНІ КЕДИ LIMITED EDITION",
      price: "4550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/5177a8ca8ff1095a2ca967b5a5e8169f252468a7?width=355",
    },
    {
      title: "ПОВСЯКДЕННІ ШКІРЯНІ ЛОФЕРИ",
      price: "2550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/1a80ae888cfc5758eb16280835261d7411994354?width=355",
    },
    {
      title: "КЕДИ З ДЕТАЛЛЮ НА ЗАДНИКУ",
      price: "3550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/1fae58714ba4bf55960d6a3560496cf6051d6ffe?width=355",
    },
    {
      title: "КЕДИ З ДЕТАЛЛЮ НА ЗАДНИКУ",
      price: "3550 uah",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/57b826b12341b28314ebfdf86d766f3d0b33469d?width=355",
    },
  ];

  const ProductSection = ({
    title,
    products,
  }: {
    title: string;
    products: typeof topBodyProducts;
  }) => (
    <div className="flex flex-col gap-4">
      {/* Section Title */}
      <div className="flex justify-center items-center h-[30px] px-4">
        <h3 className="text-[#1D1B20] font-roboto text-base font-medium leading-6 tracking-[0.15px]">
          {title}
        </h3>
      </div>

      {/* Product Carousel */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 pb-4 min-w-max">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-[28px] w-full max-w-[1038px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#1D1B20]">
            Product Catalog
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close catalog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-6 space-y-8">
            <ProductSection title="Top body" products={topBodyProducts} />
            <ProductSection title="Bottom body" products={bottomBodyProducts} />
            <ProductSection title="Shoes" products={shoesProducts} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-white">
          <div className="flex flex-wrap gap-2 justify-end">
            <button className="flex items-center min-h-[44px] px-4 py-2 bg-[#FCF8F5] text-[#4A4459] rounded-[20px] hover:bg-[#F5F1EC] transition-colors">
              <span className="text-base leading-6 tracking-[0.5px]">
                Put in the bucket selected items
              </span>
            </button>
            <button className="flex items-center min-h-[44px] px-4 py-2 bg-[#FCF8F5] text-[#4A4459] rounded-[20px] hover:bg-[#F5F1EC] transition-colors">
              <span className="text-base leading-6 tracking-[0.5px]">
                Create look with selected items
              </span>
            </button>
            <button className="flex items-center min-h-[44px] px-4 py-2 bg-[#FCF8F5] text-[#4A4459] rounded-[20px] hover:bg-[#F5F1EC] transition-colors">
              <span className="text-base leading-6 tracking-[0.5px]">
                Back to chat
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
