import { categoryProducts } from '@/pages/category/data.ts';
import Box from '@components/layout/box/Box.tsx';
import { Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  categoryId: number;
  categoryName: string;
  id: number;
  title: string;
}

const Navigation = ({ categoryId, categoryName, id, title }: NavigationProps) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const categoryProductList = categoryProducts.find((product) => product.categoryId == categoryId);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; // 선택된 값
    navigate(`/products/${selectedValue}`);
  };

  useEffect(() => {
    if (titleRef.current) {
      // 요소의 넓이 가져오기
      const elementWidth = titleRef.current.offsetWidth;
      setSelectWidth(elementWidth);
    }
  }, [title]);

  return (
    <Box
      direction="vertical"
      align="center"
      verticalAlign="middle"
      className="pt-28 pb-12 text-center md:pt-48 md:pb-20"
    >
      <Link to={`/category/${categoryId}`} className="text-zinc-500">
        #{categoryName}
      </Link>
      <h2 className="hidden mt-4 font-bold text-5xl md:block">{title}</h2>

      <span ref={titleRef} className={`absolute text-white w-fit pr-6 text-xl font-bold`}>
        {title}
      </span>
      <div className="relative mt-4">
        <select
          style={{ width: selectWidth }}
          className="pr-6 text-xl font-bold bg-white outline-none appearance-none md:hidden"
          defaultValue={id}
          onChange={handleChange}
        >
          {categoryProductList?.products.map((product) => (
            <option key={`product_option${product.id}`} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <img
          src="/assets/icon/icon-dropbox.png"
          className="absolute top-1.5 -right-0 size-5 pointer-events-none md:hidden"
        />
      </div>

      <Box
        align="center"
        verticalAlign="middle"
        className="hidden mt-12 text-zinc-400 md:flex md:mt-20 md:text-lg md:gap-10"
      >
        {categoryProductList?.products.map((product) => (
          <Link
            key={`product${product.id}`}
            to={`/products/${product.id}`}
            className={`relative font-semibold
              ${product.id === id ? 'text-black' : 'text-zinc-400'}
              last:before:content-none before:content-[""] before:absolute before:-right-5 before:top-1.5 before:border-r before:border-zinc-300 before:h-4`}
          >
            {product.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};
export default Navigation;
