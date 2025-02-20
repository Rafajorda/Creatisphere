'use server'

export async function handleSearch(formData: FormData) {
  const search = formData.get("search")
  console.log("Searching for:", search)

}
