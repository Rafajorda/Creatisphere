'use client'
require('dotenv').config();
export async function handleSearch(formData: FormData) {
  const search = formData.get("search")
 console.log('search', search);
if (typeof search === 'string' && search.trim() !== '') {
  const publicUrl = "http://localhost:3000";
  console.log(publicUrl);
  if (publicUrl) {
    window.location.href = `${publicUrl}/Shop?page=1&Name=${encodeURIComponent(search)}`;
  } else {
    console.error('PUBLIC_URL is not defined in the environment variables');
  }
}
}
