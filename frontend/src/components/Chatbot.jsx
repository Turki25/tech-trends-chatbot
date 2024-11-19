// import { useState } from 'react';
// import { useImmer } from 'use-immer';
// import api from '@/api';
// import { parseSSEStream } from '@/utils';
// import ChatMessages from '@/components/ChatMessages';
// import ChatInput from '@/components/ChatInput';

// function Chatbot() {
//   const [chatId, setChatId] = useState(null);
//   const [messages, setMessages] = useImmer([]);
//   const [newMessage, setNewMessage] = useState('');

//   const isLoading = messages.length && messages[messages.length - 1].loading;

//   async function submitNewMessage() {
//     const trimmedMessage = newMessage.trim();
//     if (!trimmedMessage || isLoading) return;

//     setMessages(draft => [...draft,
//     { role: 'user', content: trimmedMessage },
//     { role: 'assistant', content: '', sources: [], loading: true }
//     ]);
//     setNewMessage('');

//     let chatIdOrNew = chatId;
//     try {
//       if (!chatId) {
//         const { id } = await api.createChat();
//         setChatId(id);
//         chatIdOrNew = id;
//       }

//       const stream = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
//       for await (const textChunk of parseSSEStream(stream)) {
//         setMessages(draft => {
//           draft[draft.length - 1].content += textChunk;
//         });
//       }
//       setMessages(draft => {
//         draft[draft.length - 1].loading = false;
//       });
//     } catch (err) {
//       console.log(err);
//       setMessages(draft => {
//         draft[draft.length - 1].loading = false;
//         draft[draft.length - 1].error = true;
//       });
//     }
//   }

//   return (
//     <div className='relative grow flex flex-col gap-6 pt-6'>
//       {messages.length === 0 && (
//         <div className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'>
//           <p>👋 Welcome!</p>
//           <p>I’m your AI Analysis Advisor, here to help with stock forecasts, cryptocurrency trends, and company risk analysis. I provide clear, actionable insights for smarter financial decisions.</p>
//           <p>Ask me!</p>
//         </div>,
//         <div
//           className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'
//           dir='rtl'
//           style={{ textAlign: 'right' }}
//         >
//           <p>👋 اهلاً وسهلاً!</p>
//           <p>أنا مستشارك الذكي لتحليل الأسواق المالية، أقدم توقعات الأسهم، وتحليلات العملات الرقمية، وتقييم مخاطر الشركات. أوفر لك رؤى واضحة وقرارات مالية أكثر ذكاءً.</p>
//           <p>اسألني!</p>
//         </div>

//       )}
//       <ChatMessages
//         messages={messages}
//         isLoading={isLoading}
//       />
//       <ChatInput
//         newMessage={newMessage}
//         isLoading={isLoading}
//         setNewMessage={setNewMessage}
//         submitNewMessage={submitNewMessage}
//       />
//     </div>
//   );
// }
// export default Chatbot;
// import { useState } from 'react';
// import { useImmer } from 'use-immer';
// import api from '@/api';
// import ChatMessages from '@/components/ChatMessages';
// import ChatInput from '@/components/ChatInput';
// import Base64ImageViewer from '@/components/Base64ImageViewer';


// function Chatbot() {
//   const [messages, setMessages] = useImmer([]);
//   const [newMessage, setNewMessage] = useState('');

//   const isLoading = messages.length && messages[messages.length - 1].loading;

//   async function submitNewMessage() {
//     const trimmedMessage = newMessage.trim();
//     if (!trimmedMessage || isLoading) return;
  
//     // Add user's message to the chat history
//     setMessages(draft => [
//       ...draft,
//       { role: 'user', content: trimmedMessage },
//       { role: 'assistant', content: '', loading: true }
//     ]);
//     setNewMessage('');
  
//     try {
  
//       // Construct the chat history
//       const chatHistory = messages
//         .filter(message => message.role === 'user' || message.role === 'assistant')
//         .map(message => ({ role: message.role, content: message.content }));
  
//       // Create the payload
//       const payload = {
//         chat_input: trimmedMessage,
//         chat_history: [] ,//chatHistory,
//       };
  
//       // Send request to the API
//       const response = await api.sendChatMessage(payload);
//       // console.log(response); // Verify structure
//       // const { reply, sources } = response;


//       const  reply   = response["answer"];
//       const  arima_forecast   = response["arima_forecast"];
//       const  candlestick_charts   = response["candlestick_charts"];
//       const  ma_20   = response["ma_20"];


//       const sources = [];

//       // Update the assistant's message with the reply
//       setMessages(draft => {
//         draft[draft.length - 1].content = reply;
//         draft[draft.length - 1].loading = false;
//         if (sources) draft[draft.length - 1].sources = sources;
//       });
//     } catch (err) {
//       console.error('Error during API call:', err);
//       setMessages(draft => {
//         draft[draft.length - 1].loading = false;
//         draft[draft.length - 1].error = true;
//       });
//     }
//   }
  

//   return (
//     <div className='relative grow flex flex-col gap-6 pt-6'>
//       {messages.length === 0 && (
//         <div className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'>
//           <p>👋 Welcome!</p>
//           <p>I’m your AI Analysis Advisor, here to help with stock forecasts, cryptocurrency trends, and company risk analysis. I provide clear, actionable insights for smarter financial decisions.</p>
//           <p>Ask me!</p>
//         </div>,
//         <div
//           className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'
//           dir='rtl'
//           style={{ textAlign: 'right' }}
//         >
//           <p>👋 اهلاً وسهلاً!</p>
//           <p>أنا مستشارك الذكي لتحليل الأسواق المالية، أقدم توقعات الأسهم، وتحليلات العملات الرقمية، وتقييم مخاطر الشركات. أوفر لك رؤى واضحة وقرارات مالية أكثر ذكاءً.</p>
//           <p>اسألني!</p>
//         </div>
//       )}
//       <ChatMessages
//         messages={messages}
//         isLoading={isLoading}
//       />
//       <Base64ImageViewer base64String={arima_forecast} />
//       <Base64ImageViewer base64String={candlestick_charts} />
//       <Base64ImageViewer base64String={ma_20} />

//       <ChatInput
//         newMessage={newMessage}
//         isLoading={isLoading}
//         setNewMessage={setNewMessage}
//         submitNewMessage={submitNewMessage}
//       />
//     </div>
//   );
// }

// export default Chatbot;
//----------
import { useState } from 'react';
import { useImmer } from 'use-immer';
import api from '@/api';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import Base64ImageViewer from '@/components/Base64ImageViewer';

function Chatbot() {
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    // Add user's message to the chat history
    setMessages(draft => [
      ...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', loading: true, base64Images: [] }
    ]);
    setNewMessage('');

    try {
      // Construct the chat history
      const chatHistory = messages
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({ role: msg.role, content: msg.content }));

      // Create the payload
      const payload = {
        chat_input: trimmedMessage,
        chat_history: [],
      };

      // Send request to the API
      const response = await api.sendChatMessage(payload);

      // Extract response data
      const reply = response["answer"];
      const base64Images = [
        response["arima_forecast"],
        response["candlestick_charts"],
        response["ma_20"]
      ].filter(Boolean); // Filter out null or undefined images

      // Update the assistant's message with the reply and images
      setMessages(draft => {
        draft[draft.length - 1].content = reply;
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].base64Images = base64Images;
      });
    } catch (err) {
      console.error('Error during API call:', err);
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  return (
    <div className="relative grow flex flex-col gap-6 pt-6">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div>
          <div className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2">
            <p>👋 Welcome!</p>
            <p>
              I’m your AI Analysis Advisor, here to help with stock forecasts,
              cryptocurrency trends, and company risk analysis. I provide clear,
              actionable insights for smarter financial decisions.
            </p>
            <p>Ask me!</p>
          </div>
          <div
            className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2"
            dir="rtl"
            style={{ textAlign: 'right' }}
          >
            <p>👋 أهلاً وسهلاً!</p>
            <p>
              أنا مستشارك الذكي لتحليل الأسواق المالية، أقدم توقعات الأسهم،
              وتحليلات العملات الرقمية، وتقييم مخاطر الشركات. أوفر لك رؤى واضحة
              وقرارات مالية أكثر ذكاءً.
            </p>
            <p>اسألني!</p>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ChatMessages messages={messages} isLoading={isLoading} />

      {/* Render Base64 Images for the Latest Assistant Message */}
      {messages.length > 0 && messages[messages.length - 1].base64Images?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {messages[messages.length - 1].base64Images.map((image, index) => (
            <Base64ImageViewer key={index} base64String={image} />
          ))}
        </div>
      )}

      {/* Chat Input */}
      <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export default Chatbot;
