import { useState, useCallback } from 'react';

// A simple translation map. In a real app, this would be more complex,
// likely involving loading JSON files for different languages.
const translations: Record<string, Record<string, string>> = {
  en: {
    'loading_message': 'Generating your masterpiece...',
    'share_on_twitter': 'Share on X',
    'share_on_facebook': 'Share on Facebook',
    'copy_link': 'Copy Link',
    'copied_link': 'Copied!',
    'download_image': 'Download',
    'result_placeholder_title': 'Your Edited Image Will Appear Here',
    'result_placeholder_desc': 'Upload an image and provide instructions to see the magic.',
    'modal_tools_title': 'Explore Our Free AI Tools',
    'modal_tools_desc_1': 'Beyond our powerful editor, we offer a suite of free, open-source AI tools that you can use for your own projects.',
    'modal_tools_desc_2': 'These tools are designed to be easy to integrate and are perfect for developers and creators looking to add AI capabilities to their applications.',
    'modal_tools_a1111_title': 'Stable Diffusion WebUI (A1111)',
    'modal_tools_a1111_desc': 'A comprehensive web interface for Stable Diffusion, offering extensive features for image generation and manipulation.',
    'modal_tools_resrgan_title': 'Real-ESRGAN',
    'modal_tools_resrgan_desc': 'An advanced image super-resolution tool that enhances photo quality with remarkable clarity.',
    'modal_tools_get_started': 'How to Get Started?',
    'modal_tools_get_started_desc': 'Check out the documentation and repositories on our website to learn how to deploy and use these powerful tools for free.',
    'modal_close_button': 'Got It, Thanks!',
    'app_title': 'AI Image Magic Editor',
    'app_description': 'Effortlessly edit your images with the power of AI. Just upload a photo, describe your desired changes, and watch the magic happen.',
    'source_image_title': 'Source Image',
    'source_image_description': 'Upload the image you want to edit.',
    'edit_instructions_title': 'Edit Instructions',
    'edit_instructions_placeholder': 'e.g., "Change the background to a beach at sunset", "make my hair blue", "add a cat wearing a party hat"',
    'generate_button': 'Generate',
    'generating_button': 'Generating...',
    'error_policy_violation': 'Your request could not be processed due to a policy violation. Please modify your prompt and try again.',
    'error_generic': 'An unexpected error occurred. Please try again later.',
    'header_github': 'GitHub',
    'header_tools': 'Free Tools'
  },
};

export const useTranslation = () => {
  const [language, setLanguage] = useState('en'); // Default language

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || key;
  }, [language]);

  return { t, setLanguage, language };
};
