import axios from 'axios';

async function listBitbucketAPI(endpoint, headers, carry = []) {
  const response = await axios.get(endpoint, {
    withCredentials: false,
    headers,
  });
  const { next, values } = response.data;
  const newCarry = [...carry, ...values];
  console.log('listBitbucketAPI', next);
  if (!next) {
    console.log('done', newCarry);
    return { data: newCarry };
  }
  console.log('continue');
  return listBitbucketAPI(next, headers, newCarry);
}

export default listBitbucketAPI;
