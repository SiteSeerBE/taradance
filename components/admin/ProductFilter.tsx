"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

type Props = {
  products: { id: number; name: string }[];
  selectedProductId?: number;
};

const ProductFilter: React.FC<Props> = ({ products, selectedProductId }) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(value ? `/admin/dansers?productId=${value}` : "/admin/dansers");
  };

  return (
    <fieldset className="col-xs-12 col-sm-6">
      <label>
        Filter
        <select value={selectedProductId ?? ""} onChange={handleChange}>
          <option value="">Alle lessen</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
    </fieldset>
  );
};

ProductFilter.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedProductId: PropTypes.number,
};

export default ProductFilter;
