import Heading from "components/Heading";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function New() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [free, setFree] = useState(false);
  const loading = status === 'loading';

  if (loading) return null;
  if (!session) { router.push('/'); }

  const handleTitle = (event) => setTitle(event.target.value);
  const handleFree = () => setFree(!free);
  const handlePrice = (event) => setPrice(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 3072000) {
        alert('max size is 3MB');
        return false;
      }
      setImage(event.target.files[0]);
    }
  }

  const handleProduct = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 20480000) {
        alert('max size is 20MB');
        return false;
      }
      setProduct(event.target.files[0]);
    }   
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('image', image);
    body.append('product', product);
    body.append('title', title);
    body.append('free', free);
    body.append('price', price);
    body.append('description', description);

    console.log(body);

    await fetch('/api/new', {
      method: 'POST',
      body
    });

    router.push('/dashboard');
  }

  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website"/>        
      </Head>

      <Heading />
      <h1 className='flex justify-center mt-20 text-xl'>Add a new product</h1>
      <div className='flex justify-center'>
        <form className='mt-10' onSubmit={handleSubmit}>
          <div className='flex-1 mb-5'>
            <div className='flex-1 mb-2'>Product title (required)</div>
            <input 
              type="text" 
              className='border p-1 text-black mb-4'
              onChange={handleTitle}
              required
            />
            <div className='relative flex items-start mt-2 mb-3'>
              <div className="flex items-center h-5">
                <input type="checkbox" checked={free} onChange={handleFree} />
              </div>
              <div className='ml-3 text-sm'>
                <label>
                  Check if the product is free
                </label>
              </div>
            </div>
            {!free && (
              <>
                <div className='flex-1 mb-2'>Product price in $</div>
                <input 
                  type="text" 
                  pattern='^\d*(\.\d{0,2})?$'
                  className='border p-1 text-black mb-4'
                  onChange={handlePrice}
                  required
                />
              </>
            )}
            <div className='flex-1 mb-2'>Description</div>
            <textarea 
              onChange={handleDescription}
              className="border p-1 text-black "
            />
          </div>
          <div className='text-sm text-gray-200 '>
            <label>
              <p>Product Image {image && '✅'}</p> (800 x 450 suggested)
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>
          <div className='text-sm text-gray-200 '>
            <label className='relative font-medium cursor-pointer my-3 block'>
              <p>Product {product && '✅'}</p>
              <input 
                type="file"
                className='hidden'
                onChange={handleProduct}
              />
            </label>
          </div>
          <button
            disabled={title && product && (free || price) ? false : true}
            className={`border px-8 py-2 mt-10 font-bold  ${
              title && (free || price)
                ? ''
                : 'cursor-not-allowed text-gray-800 border-gray-800'
            }`}
          >
            Create product
          </button>
        </form>
      </div>
    </div>
  );
};
