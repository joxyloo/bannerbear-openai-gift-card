const { Bannerbear } = require('bannerbear');
const OpenAI = require('openai');

const OPENAI_API_KEY = 'your_openai_api_key';
const BB_API_KEY = 'your_bannerbear_api_key';
const BB_TEMPLATE_ID = 'your_template_id';

(async () => {
  // Generate AI images
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  const image = await openai.images.generate({
    prompt: 'A cat wearing sunglasses, in the style of vintage art deco poster',
    size: '512x512',
    n: 10,
  });

  // Generate gift cards
  const bb = new Bannerbear(BB_API_KEY);

  image.data.forEach(async (data) => {
    const aiImageUrl = data.url;
    const images = await bb.create_image(
      BB_TEMPLATE_ID,
      {
        modifications: [
          {
            name: 'qr_code',
            target: 'https://www.bannerbear.com', // replace with a unique link for each gift card
          },
          {
            name: 'image_container',
            image_url: aiImageUrl,
          },
        ],
      },
      true
    );

    console.log(images);
  });
})();
