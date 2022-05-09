import React, { Suspense } from 'react';

const Product = props => {

    const { name, image, price, id, onBid } = props;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <tr>
                <td className="border-r"><img src={image} className="object-cover w-36" alt={name} /></td>
                <td className="text-center border-r">{name}</td>
                <td className="text-center border-r">{price} ETH</td>
                <td className="text-center border-r">
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => onBid(id)}>Bid</button>
                </td>
            </tr>
        </Suspense>
    );
}

Product.displayName = 'Product';

export default Product;