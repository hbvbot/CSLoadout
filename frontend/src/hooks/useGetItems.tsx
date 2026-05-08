import { useState, useEffect } from 'react';
import getItems from '../api/itemsApi'

export function useGetItems() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const items = await getItems();
        setData(items)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading, error };
}
