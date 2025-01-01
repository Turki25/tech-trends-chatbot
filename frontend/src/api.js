// const BASE_URL = import.meta.env.VITE_API_URL;

// async function createChat() {
//   const res = await fetch(BASE_URL + '/chats', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   });
//   const data = await res.json();
//   if (!res.ok) {
//     return Promise.reject({ status: res.status, data });
//   }
//   return data;
// }

// async function sendChatMessage(chatId, message) {
//   const res = await fetch(BASE_URL + `/chats/${chatId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message })
//   });
//   if (!res.ok) {
//     return Promise.reject({ status: res.status, data: await res.json() });
//   }
//   return res.body;
// }

// export default {
//   createChat, sendChatMessage
// };

// //------------

// const BASE_URL = import.meta.env.VITE_API_URL;

// // Function to handle inference/scoring
// async function scoreData(payload) {
//   try {
//     const res = await fetch(BASE_URL + '/score', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Assuming API_KEY is stored in environment variables
//       },
//       body: JSON.stringify(payload),
//     });

//     // Handle non-2xx status codes
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(
//         `Request failed with status ${res.status}: ${JSON.stringify(errorData)}`
//       );
//     }

//     // Parse and return the response JSON
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Error during scoring:', error);
//     throw error; // Re-throw to handle in the calling function
//   }
// }

// export default {
//   scoreData,
// };
//---------
// const BASE_URL = "https://sultan-9953-aoidm.eastus2.inference.ml.azure.com/score";
// const BASE_URL = "https://api-for-web.azure-api.net/score";
// const DEPLOYMENT_NAME = "sultan-9953-aoidm-1";

// // Reusable function for scoring
// async function sendChatMessage(payload, apiKey="1nzrvr9HhlNiCDJl0moeSVkbGhokq47e") {
//   if (!apiKey) {
//     throw new Error("An API key must be provided to invoke the endpoint.");
//   }

//   console.log(apiKey)
//   console.log(payload)

//   const headers = new Headers({
//     "Authorization": `Bearer ${apiKey}`,
//     "azureml-model-deployment": DEPLOYMENT_NAME, // Deployment-specific header
//   });
//   console.log(headers)

//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(payload),
//     });
//     console.log(response)
//     if (!response.ok) {
//       const errorDetails = await response.text();
//       console.error("Response Headers:", response.headers);
//       console.error("Response Body:", errorDetails);
//       throw new Error(`Request failed with status code ${response.status}`);
//     }

//     // Return the parsed JSON response
//     response.json().then(data => console.log(data))
//     let res = "kk"
//     return res
//   } catch (error) {
//     console.error("Error during scoring:", error);
//     throw error; // Re-throw for caller to handle
//   }
// }

// export default {sendChatMessage};
//----
// const BASE_URL = "https://sultan-9953-aoidm.eastus2.inference.ml.azure.com/score";
const BASE_URL = "https://api-for-web-v1-0-4.azure-api.net/score";
const DEPLOYMENT_NAME = "sultan-9953-xuadj-1";
const apiKey1 = import.meta.env.VITE_API_KEY;

console.log(apiKey1);
// Reusable function for scoring
async function sendChatMessage(payload, apiKey = apiKey1) {
  if (!apiKey) {
    throw new Error("An API key must be provided to invoke the endpoint.");
  }


  const headers = new Headers({
    "Authorization": `Bearer ${apiKey}`,
    "azureml-model-deployment": DEPLOYMENT_NAME,
    "Content-Type": "application/json",
  });

  console.log("Headers:", [...headers.entries()]);

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    console.log("Response Status:", response.status);

    // Print the raw response body as text
    const rawResponse = await response.text();
    console.log("Raw Response Body:", rawResponse);

    // Handle non-OK responses
    if (!response.ok) {
      console.error("Request Failed!");
      console.error("Payload Sent:", payload);
      console.error("Response Headers:", [...response.headers.entries()]);
      // throw new Error(`Request failed with status code ${response.status}`);
      return {"answer":"I'm not sure I understand your request. Could you clarify or provide more details? I'll do my best to assist you!","arima_forecast":null,"candlestick_charts":null,"ma_20":null};
    }

    // Parse the response as JSON after printing the raw response
    const parsedResponse = JSON.parse(rawResponse);
    console.log("Parsed Response:", parsedResponse["answer"]);

    return parsedResponse;
  } catch (error) {
    console.error("Error during scoring:", error);
    return {"answer":"I'm not sure I understand your request. Could you clarify or provide more details? I'll do my best to assist you!","arima_forecast":null,"candlestick_charts":null,"ma_20":null};

    // throw error; // Re-throw for caller to handle
  }
}

export default { sendChatMessage };
