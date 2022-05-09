import React, { Suspense } from 'react';

const Product = props => {

    const { name, image, price } = props;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <table className="items-center bg-transparent border-collapse">
            <tbody>
              <tr>
                  <td className="border-t-0 px-6 w-50 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img src={image} className="h-12 w-20 bg-white rounded-full border" alt="..." />
                  </td>
                  <td className="border-t-0 px-6 w-100 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{name}</td>     
                <td className="border-t-0 px-6 w-50 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{price} ETH</td>           
              </tr>            
            </tbody>
          </table>
        </Suspense>
    );
}

Product.displayName = 'Product';

export default Product;