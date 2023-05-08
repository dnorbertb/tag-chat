import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import { apiAddress } from '../configs/apiConfig';
import EventSource, { EventSourceListener } from 'react-native-sse';

export const useEventListener = () => {
  const [listening, setListenig] = useState(false);
  const userId = useAppSelector((state) => state.app.value.userId);

  useEffect(() => {
    if (!listening && userId.length > 4) {
      const query = `?id=${userId}`;
      const es = new EventSource(apiAddress + '/events' + query);

      const onMessage: EventSourceListener = (e) => {
        if (e.type !== 'message') return;
        const data = JSON.parse(e.data ?? '');
        if(data.newContent.type === 'message') {
            console.log("Load new message in redux")
        }
      };

      es.addEventListener('message', onMessage);

      setListenig(true);

      return () => {
        console.log('removed');
        setListenig(false);
        es.removeAllEventListeners();
        es.close();
      };
    }
  }, [userId]);

  return { listening };
};
