const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Alexandria, Egypt, circa 300 BC.  Merchants are hawking goods, scholars are debating philosophy, and soldiers in Hellenistic armor patrol the streets.  Highly detailed, photorealistic, golden hour lighting, wide angle lens, depth of field, bustling atmosphere, historical accuracy.\",\n    \"contentText\": \"Did you know that the Library of Alexandria, one of the largest and most significant libraries of the ancient world, mysteriously disappeared?  Its vast collection of scrolls held centuries of knowledge.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of a scholar meticulously copying a scroll by candlelight inside the Library of Alexandria. Ink stained fingers, focused expression, papyrus, quill, clay inkwell.  Dark, atmospheric, Rembrandt lighting, highly detailed, realistic skin textures.\",\n    \"contentText\": \"Scholars meticulously copied texts, preserving them for future generations. Think of all the lost scientific discoveries, literature, and historical accounts!\"\n  },\n  {\n    \"imagePrompt\": \"A massive fire engulfing a section of the Library of Alexandria. Flames leaping high into the sky, panicked citizens fleeing.  Wide angle lens, dramatic lighting, apocalyptic feel, photorealistic, historical clothing, smoke and debris.\",\n    \"contentText\": \"The circumstances of its destruction are debated, with theories ranging from accidental fires to deliberate acts of war. \"\n  },\n  {\n    \"imagePrompt\": \"An archaeologist carefully brushing away dirt from a partially uncovered scroll fragment in a modern-day excavation site in Alexandria.  Ancient ruins in the background, sunlight filtering through the sand, realistic textures.  Medium shot, documentary style, realistic lighting.\",\n    \"contentText\": \"Even today, archaeologists search for remnants, hoping to unlock the secrets lost within those ancient walls.  Imagine what we could learn!\"\n  },\n  {\n    \"imagePrompt\": \"A stylized, abstract image representing the transmission of knowledge.  Glowing lines connecting ancient scrolls to modern computers, symbolizing the enduring power of ideas.  Digital art, vibrant colors, abstract shapes, futuristic elements juxtaposed with ancient artifacts.\",\n    \"contentText\": \"The Library of Alexandria serves as a reminder of the importance of preserving knowledge and the devastating consequences of its loss.  A warning echoed through the ages.\"\n  }\n]\n```\n"},
      ],
    },
  ],
});

  