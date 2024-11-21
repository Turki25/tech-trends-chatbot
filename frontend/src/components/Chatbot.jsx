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
      // Construct chat history for the payload
      const formattedHistory = messages.map((msg, index) => ({
        inputs: {
          chat_input: msg.role === 'user' ? msg.content : null,
        },
        outputs: {
          answer: msg.role === 'assistant' ? msg.content : null,
          arima_forecast: msg.base64Images?.[0] || null,
          candlestick_charts: msg.base64Images?.[1] || null,
          ma_20: msg.base64Images?.[2] || null,
        },
      }));

      // Create the payload
      const payload = {
        chat_input: trimmedMessage,
        chat_history: formattedHistory,
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
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-4">
          <ChatMessages messages={[message]} />
          {message.base64Images?.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {message.base64Images.map((image, imgIndex) => (
                <Base64ImageViewer key={imgIndex} base64String={image} />
              ))}
            </div>
          )}
        </div>
      ))}

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