import axios from 'axios';

// * 백엔드에 데이터를 보낼 때 쿠키도 같이 보내기 위해서는 withCredentials를 같이 보내야 한다.
const fetcher = (url: string) => axios.get(url, { withCredentials: true })
  .then((response) => response.data);

export default fetcher;
