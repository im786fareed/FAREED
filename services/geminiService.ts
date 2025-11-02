import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

// FIX: Initialize GoogleGenAI with the API key.
const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Basic content moderation filter
const religiousHateKeywords = [
    'attack muslims', 'attack christians', 'attack jews', 'attack hindus', 'attack buddhists',
    'kill muslims', 'kill christians', 'kill jews', 'kill hindus', 'kill buddhists',
    'hate islam', 'hate christianity', 'hate judaism', 'hate hinduism', 'hate buddhism',
    'destroy mosque', 'destroy church', 'destroy synagogue', 'destroy temple',
    'holy war against', 'crusade against', 'jihad against'
];

const checkForPolicyViolations = (prompt: string) => {
    const lowerCasePrompt = prompt.toLowerCase();
    if (religiousHateKeywords.some(keyword => lowerCasePrompt.includes(keyword))) {
        throw new Error("POLICY_VIOLATION");
    }
};

const cartoonToRealKeywords = [
    'real', 'realistic', 'photorealistic', 'human version', 'in real life', 'live action'
];

const isCartoonToRealRequest = (prompt: string): boolean => {
    const lowerCasePrompt = prompt.toLowerCase();
    return cartoonToRealKeywords.some(keyword => lowerCasePrompt.includes(keyword));
};

export const editImageWithGemini = async (
  prompt: string,
  sourceImage: ImageData,
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  checkForPolicyViolations(prompt);

  let systemPrompt: string;

  if (isCartoonToRealRequest(prompt)) {
    // New, much more forceful prompt for hyperrealism.
    systemPrompt = `
      Your task is to perform an expert-level transformation of the provided image into a truly photorealistic masterpiece.
      The source is a cartoon, illustration, or drawing. The output MUST look like a real photograph captured with a high-end camera.

      Key directives:
      1.  **Subject Identification:** First, accurately identify the main subject(s) (e.g., person, animal, object).
      2.  **Hyperrealism:** Create a version of this subject that is indistinguishable from reality. This means:
          - **Textures:** Render realistic textures. If it's a person, show skin pores, fine hair, and natural imperfections. If it's an animal, render individual strands of fur or feathers. If it's an object, show surface material properties like metal sheen or wood grain.
          - **Lighting & Shadows:** The lighting must be natural and consistent, casting realistic shadows and highlights.
          - **Anatomy & Form:** The subject's form and anatomy must be believable and correct for the real world.
      3.  **Maintain Essence:** While transforming, preserve the core identity, pose, and expression of the original subject. Do not change the subject into something else.
      4.  **No Artistic Style:** The final image must be completely devoid of any cartoonish or artistic style. It must be a pure, photorealistic representation.

      The user's specific request is: "${prompt}". Apply this request within the context of the transformation to photorealism.
    `;
  } else {
    // A refined prompt for professional-quality photo editing.
    systemPrompt = `
      You are an expert photo editor. Your task is to apply the user's instruction to the provided photograph.
      Your highest priority is to maintain the realism and authenticity of the original image, especially the identity and facial features of any people present.
      The edit should be subtle and seamless, as if it were part of the original photo. Avoid any changes that look artificial, airbrushed, or out of place.
      The final image must remain a believable photograph.
      
      The user's instruction is: "${prompt}"
    `;
  }
    
  const parts = [
    {
      inlineData: {
        mimeType: sourceImage.mimeType,
        data: sourceImage.data,
      },
    },
    { text: systemPrompt },
  ];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    if (
        response.candidates &&
        response.candidates[0].content &&
        response.candidates[0].content.parts
    ) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return part.inlineData.data;
            }
        }
    }
    throw new Error("No image data found in Gemini response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message === 'POLICY_VIOLATION') {
      throw error; // Re-throw the specific error for the UI to catch
    }
    throw new Error("Failed to generate image with Gemini. Check console for details.");
  }
};