import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { apiAddress } from '../configs/apiConfig';
import EventSource, { EventSourceListener } from 'react-native-sse';
import { fetchNewMessagesService } from '../services/messageService';
import { addMessageToConversation } from '../features/conversations';
import { scheduleMessagePushNotification } from '../helpers/scheduleMessagePushNotification';

export const serverEventListener = () => {
  const [isListening, setListenig] = useState(false);
  const userId = useAppSelector((state) => state.app.value.userId);
  const dispatch = useAppDispatch();

  // Event listener
  useEffect(() => {
    if (!isListening && userId.length > 4) {
      const query = `?id=${userId}`;
      const es = new EventSource(apiAddress + '/events' + query);

      const onMessage: EventSourceListener = async (e) => {
        if (e.type !== 'message') return;
        const data = JSON.parse(e.data ?? '');
        if (data.newContent.type === 'message') {
          const newMessages = await fetchNewMessagesService(userId);
          if (newMessages.success) {
            newMessages.data.forEach((m) => {
              dispatch(addMessageToConversation({ sentByUser: false, ...m }));
            });
            const lastMsg = newMessages.data.at(-1)!;
            scheduleMessagePushNotification(lastMsg);
          }
        }
      };

      es.addEventListener('message', onMessage);

      setListenig(true);

      return () => {
        setListenig(false);
        es.removeAllEventListeners();
        es.close();
      };
    }
  }, [userId]);

  return { isListening };
};
