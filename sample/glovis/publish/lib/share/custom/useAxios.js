import {useState, useEffect} from 'react'
import axios from 'axios'

const useAxios = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios.get(url,{responseType: 'blob'});
        setData([res.data]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  
  return [data, isLoading, isError, setUrl];
};


export default useAxios