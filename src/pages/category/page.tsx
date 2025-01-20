import { categories, categoryProducts } from '@/pages/category/data.ts';
import Box from '@components/layout/box/Box.tsx';
import { Link, useParams } from 'react-router';
import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import MainScreen from '@components/common/MainScreen.tsx';
import { Helmet } from 'react-helmet-async';

const Category = () => {
  const { id } = useParams();
  const categoryId = id || categories[0].id;
  const categoryProductList = categoryProducts.find(
    (product) => product.categoryId == Number(categoryId)
  );

  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | {categoryProductList?.categoryName}</title>
      </Helmet>

      <MainScreen title="시술 안내 · 가격" img="/assets/images/category-main.jpg" />

      <CategoryMenu categoryId={categoryId} />

      <MaxScreenSize className="!px-0 md:!px-4">
        <Box direction="horizontal" className="w-full flex-wrap md:items-stretch md:py-28 md:gap-4">
          {categoryProductList?.products.map((product) => (
            <Product {...product} key={`product${product.id}`} />
          ))}
        </Box>
      </MaxScreenSize>
    </div>
  );
};

export default Category;

/**
 * Component
 */

interface CategoryMenuProps {
  categoryId: number | string;
}

const CategoryMenu = ({ categoryId }: CategoryMenuProps) => {
  return (
    <div className="py-4 gap-4 bg-zinc-100 flex-wrap md:py-28">
      <MaxScreenSize>
        <Box direction="horizontal" className="flex-wrap gap-4">
          {categories.map((category) => (
            <Link
              key={`category${category.id}`}
              to={`/category/${category.id}`}
              className={`w-[calc(50%-8px)] py-4 text-center rounded-lg text-sm md:text-lg md:w-[calc(20%-13px)]
                  ${category.id == categoryId ? 'font-bold bg-[#c1b6a3] text-white' : 'bg-white'}`}
            >
              {category.name}
            </Link>
          ))}
        </Box>
      </MaxScreenSize>
    </div>
  );
};

interface ProductInfo {
  id: number;
  name: string;
  description: string;
}

const Product = ({ id, name, description }: ProductInfo) => {
  return (
    <Link
      key={`product${id}`}
      to={`/products/${id}`}
      className="relative w-full p-6 border-b border-zinc-200 bg-white last:border-b-0 md:w-[calc(50%-8px)] md:border md:rounded-lg md:last:border-b"
    >
      <Box direction="horizontal" align="space-between" verticalAlign="middle" className="gap-2">
        <Box direction="vertical" className="gap-1.5">
          <div className="font-bold md:text-2xl">{name}</div>
          <div
            className="md:min-h-11 text-zinc-500"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </Box>

        <img src="/assets/icon/icon-moveon.png" alt="next" className="h-8 " />
      </Box>
    </Link>
  );
};
