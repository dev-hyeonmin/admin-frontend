import MaxScreenSize from '@components/common/MaxScreenSize.tsx';
import { products } from '@/pages/products/[id]/data.ts';
import { useParams } from 'react-router';
import Steps from '@/pages/products/[id]/_components/Steps.tsx';
import Info from '@/pages/products/[id]/_components/Info.tsx';
import Qna from '@/pages/products/[id]/_components/Qna.tsx';
import Notice from '@/pages/products/[id]/_components/Notice.tsx';
import Images from '@/pages/products/[id]/_components/Images.tsx';
import Navigation from '@/pages/products/[id]/_components/Navigation.tsx';
import Title from '@/pages/products/[id]/_components/Title.tsx';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <>loading</>;
  }

  return (
    <div>
      <Helmet>
        <title>센텀스타의원 | {product.name}</title>
      </Helmet>

      <Navigation
        categoryId={product.categoryId}
        categoryName={product.categoryName}
        id={product.id}
        title={product.name}
      />
      <Title subTitle={product.subTitle} subDescription={product.subDescription} />
      <Steps list={product.steps} />
      {product.productDesc && (
        <MaxScreenSize className="!max-w-screen-md py-12 border-t border-b border-zinc-200 leading-relaxed md:py-20">
          <div dangerouslySetInnerHTML={{ __html: product.productDesc }}></div>
        </MaxScreenSize>
      )}
      <Images list={product.images} />

      <Info title={`주사종류`} list={product.injection} />
      <Info title={`${product.name} 장점`} list={product.merit} />
      <Info title="시술추천대상" list={product.recommend} />
      <Qna list={product.qna} />
      <Notice list={product.notice} />
    </div>
  );
};

export default Products;
