// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini API with your key
// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// export async function fetchCourseAnalytics(topic, filters) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const timeRangeText = filters.timeRange === 'all' ? '' : `from the last ${filters.timeRange} years`;
//     const locationText = filters.location === 'india' ? 'from Indian creators' : '';
    
//     const prompt = `Generate a list of top 10 YouTube educational channels/creators (NOT Udemy, Coursera, or other platforms) teaching ${topic} ${timeRangeText} ${locationText}. 
//     Sort results by ${filters.sortBy}.
//     For each channel, also suggest 2 most relevant playlists/series from that creator.
//     Return the data in this exact JSON format, no additional text:
//     {
//       "courses": [
//         {
//           "youtuberName": "Real YouTube channel name",
//           "profilePhoto": "https://ui-avatars.com/api/?name=Channel+Name",
//           "courseName": "Actual ${topic} playlist/series title",
//           "watchTime": "500",
//           "subscribers": "50000",
//           "engagement": "75%",
//           "location": "Country",
//           "publishedYear": "2023",
//           "isVerified": true,
//           "recommendedPlaylists": [
//             {
//               "title": "Another relevant playlist title",
//               "videos": "25",
//               "totalDuration": "10 hours"
//             },
//             {
//               "title": "Second relevant playlist title",
//               "videos": "30",
//               "totalDuration": "12 hours"
//             }
//           ]
//         }
//       ]
//     }`;

//     console.log('Sending prompt:', prompt);

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     console.log('Raw API response:', text);

//     try {
//       const parsedData = JSON.parse(text);
//       console.log('Parsed data:', parsedData);
//       return parsedData;
//     } catch (parseError) {
//       console.error('Failed to parse JSON:', text);
//       throw new Error('Invalid response format from AI');
//     }
//   } catch (error) {
//     console.error('Gemini API error:', error.message);
//     if (error.message.includes('API key')) {
//       throw new Error('Invalid API key. Please check your configuration.');
//     }
//     throw error;
//   }
// } 

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your key
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function fetchCourseAnalytics(topic, filters) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const timeRangeText = filters.timeRange === 'all' ? '' : `from the last ${filters.timeRange} years`;
    const locationText = filters.location === 'india' ? 'from Indian creators' : '';
    
    // Enhanced prompt with more specific instructions for programming topics
    const prompt = `Act as a programming education expert. Generate a detailed list of top 10 YouTube educational channels/creators (NOT Udemy, Coursera, or other platforms) specifically teaching ${topic} ${timeRangeText} ${locationText}. 

Focus on channels that:
1. Have dedicated playlist(s) about ${topic}
2. Are known for teaching programming/development
3. Have recent, up-to-date content
4. Provide comprehensive coverage of ${topic}

Sort results by ${filters.sortBy}.
For each channel, find their most comprehensive and highly-rated playlists specifically about ${topic}.

Return the data in this exact JSON format, with accurate numbers and details:
{
  "courses": [
    {
      "youtuberName": "Real YouTube channel name",
      "profilePhoto": "https://ui-avatars.com/api/?name=Channel+Name",
      "courseName": "Specific ${topic} playlist/series title that actually exists",
      "watchTime": "estimated average watch time in minutes",
      "subscribers": "actual subscriber count",
      "engagement": "average engagement rate as percentage",
      "location": "Creator's country",
      "publishedYear": "Year of the most recent video in the playlist",
      "isVerified": true/false based on YouTube verification,
      "recommendedPlaylists": [
        {
          "title": "Actual existing playlist title about ${topic}",
          "videos": "number of videos",
          "totalDuration": "total duration in hours"
        },
        {
          "title": "Second actual existing playlist title about ${topic}",
          "videos": "number of videos",
          "totalDuration": "total duration in hours"
        }
      ]
    }
  ]
}

Only include channels that have actual, dedicated content about ${topic}. Verify that the playlists mentioned are real and focused on ${topic}.`;

    console.log('Sending prompt:', prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw API response:', text);

    try {
      const parsedData = JSON.parse(text);
      
      // Validate the response data
      if (!parsedData.courses || !Array.isArray(parsedData.courses)) {
        throw new Error('Invalid response structure');
      }

      // Basic data validation
      parsedData.courses = parsedData.courses.map(course => ({
        ...course,
        subscribers: String(course.subscribers).replace(/\D/g, ''), // Clean up subscriber numbers
        watchTime: String(course.watchTime).replace(/[^0-9.]/g, ''), // Clean up watch time
        engagement: String(course.engagement).replace(/[^0-9.%]/g, ''), // Clean up engagement rate
      }));

      console.log('Parsed and validated data:', parsedData);
      return parsedData;
    } catch (parseError) {
      console.error('Failed to parse or validate JSON:', text);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw new Error(`Failed to fetch course analytics: ${error.message}`);
  }
}