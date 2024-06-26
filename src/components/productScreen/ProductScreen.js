import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ratings from "../home/Ratings";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/actions/cartAction";
import { apiEndpoint } from "../../API_ENDPOINT";
import { singleProductDetails } from "../../redux/slice/productSlice";
import { addToCart, cartItemLists } from "../../redux/slice/cartSlice";

const ProductScreen = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productLists)
    const { status, error, singleProductData } = productDetail

    useEffect(() => {
        dispatch(singleProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = async (id) => {
        const productId = id
        const userId = localStorage.getItem('userId')

        const productData = { productId, userId }

        dispatch(addToCart(productData))
            .then((res) => {
                dispatch(cartItemLists(userId))
                navigate(`/cart/?productId=${productId}`)
            })
    }

    const a = () => {
        if (!localStorage.getItem('token')) {
            alert('Please login')
            navigate('/login')
            return false
        }
    }

    return (
        <div style={{ minHeight: "100vh" }}>
            <button className="ml-4 pt-2 pb-2 pl-6 pr-6  bg-teal-500  rounded-lg text-white font-semibold"
                onClick={() => navigate(-1 || '/')}
            >
                Back
            </button>
            {status === "loading" ?
                <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>Loading...</span></div> : error ?
                    <div className="text-center max-w-full text-2xl capitalize font-semibold"><span>failed to get product details</span></div> :

                    <div className="flex justify-center p-2">
                        <div>
                            <div className="flex justify-center shadow-xl shadow-black/20 dark:shadow-black/20 capitalize bg-slate-200 rounded-lg  lg:flex-wrap">
                                <div className="w-1/2">
                                    {singleProductData?.img?.includes("jpeg") || singleProductData?.img?.includes("jpg") ?
                                        <img src={singleProductData?.img} className="img-product object-cover" loading="lazy" alt={singleProductData?.name} />
                                        :
                                        <img src={`${apiEndpoint}/uploads/${singleProductData?.img}`} className="img-product object-cover" loading="lazy" alt={singleProductData?.name} />
                                    }
                                </div>
                                <div className="grid p-4 w-full">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span>
                                                <strong className="text-lg  pr-4">Name : </strong>  {singleProductData?.name}
                                            </span>
                                            <span>
                                                {singleProductData?.inStock > 1 ? (
                                                    <span
                                                        className="inline-block whitespace-nowrap rounded-[0.27rem] bg-blue-800 p-2 text-center  text-lg font-semibold leading-none text-white">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-800 p-2 text-center  text-lg font-semibold leading-none text-white">
                                                        Not Available
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="rating-span flex items-center">
                                                <strong className="pr-4">Ratings  :</strong>
                                                <Ratings ratings={singleProductData?.ratings} />
                                                {singleProductData?.ratings}
                                            </span>
                                        </div>
                                        <span className="pb-2"> <strong className="pr-4 text-lg ">Brand : </strong>{singleProductData?.brand}</span>
                                        <span className="pb-2"> <strong className="pr-4 text-lg ">Price : </strong>Rs.{singleProductData?.price}</span>
                                        {/* <div>
                                        <strong className="pr-4 text-lg">quantity</strong>
                                        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                            {
                                                [...Array(product?.inStock).keys()].map((x) => <option kay={x + 1} value={x + 1}>{x + 1}</option>)

                                            }
                                        </select>
                                    </div> */}
                                        {/* <div className="flex items-center">
                                        <span><strong className="pr-4"> Select Size : </strong></span>
                                        <select name="options" id="options" className="text-center"
                                        // onChange={(e) => setSelected(e.target.value)}
                                        >
                                            {product?.size.map((curSize, idx) => {
                                                return (
                                                    <option value={curSize} key={idx}>{curSize}</option>
                                                )
                                            })}
                                        </select>
                                    </div> */}
                                        {/* <div className="product-color-container">
                                        Select Color :
                                        {product?.colors.map((c, idx) => {
                                            return (
                                                <button key={idx}
                                                    // onClick={() => setColor(c)}
                                                    // className={color === c ? "color-btn btn-selected" : "color-btn"}
                                                    style={{ backgroundColor: c }}
                                                >{c}</button>
                                            )
                                        })}
                                    </div> */}
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <strong className="pr-4 text-lg ">Description : </strong><br />
                                                <span> {singleProductData?.description}</span>
                                            </div>

                                            <div>
                                                <strong className="pr-4 text-lg ">instruction : </strong>
                                                <span>{singleProductData?.instruction}</span>
                                            </div>

                                        </div>

                                        {singleProductData?.inStock > 1 ?
                                            <button className="w-fit bg-blue-800 p-2 mt-4 text-white rounded"
                                                onClick={() => {
                                                    addToCartHandler(singleProductData?._id)
                                                    a()
                                                }}
                                            >Order Now</button>
                                            :
                                            <button className="w-fit bg-blue-500 p-2 mt-4 text-white rounded disabled:pointer-events-none"
                                            >Order Now</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default ProductScreen;
