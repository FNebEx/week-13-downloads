import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Setup() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const loading = status === 'loading';

  if (!session || !session.user) return null;
  if (loading) return null;

  const handleChange = (event) => setName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    session.user.name = name;
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className='mt-10 text-center'>
      <h1 className='flex justify-center mt-20 text-xl'>Welcome!</h1>
      <div className='flex-1 mb-5 mt-20'>
        <div className='flex-1 mb-5'>Please enter your name</div>
        <input 
          type="text" 
          name="name"
          onChange={handleChange} 
          className='border p-1 text-black'
          required
        />
      </div>
      <button className='border px-8 py-2 mt-0 font-bold hover:bg-white hover:text-black'>
        Save
      </button>
    </form>
  );
};
