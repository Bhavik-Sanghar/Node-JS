document.getElementById('uploadForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData();
  const imageInput = document.getElementById('imageInput');
  formData.append('image', imageInput.files[0]);

  const captionResult = document.getElementById('captionResult');
  const captionList = captionResult.querySelector('ul');
  captionList.innerHTML = '<li>Generating caption...</li>';

  try {
      const response = await fetch('/generate-caption', {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!data.captions || !Array.isArray(data.captions)) {
          throw new Error('Invalid response format');
      }

      // Clear the previous caption
      captionList.innerHTML = '';

      // Display the single caption with a copy button
      if (data.captions.length > 0) {
          const caption = data.captions[0];
          const listItem = document.createElement('li');
          const captionItem = document.createElement('div');
          captionItem.className = 'caption-item';
          
          const captionText = document.createElement('span');
          captionText.className = 'caption-text';
          captionText.textContent = caption;
      
          const copyButton = document.createElement('button');
          copyButton.className = 'copy-btn';
          copyButton.title = 'Copy to clipboard';
          copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>`; // SVG for copy button
          copyButton.addEventListener('click', () => {
              navigator.clipboard.writeText(caption);
              // Use a more user-friendly alert, like a toast notification
              const toast = document.createElement('div');
              toast.className = 'toast';
              toast.textContent = 'Caption copied to clipboard!';
              document.body.appendChild(toast);
              setTimeout(() => {
                  toast.remove();
              }, 2000);
          });
      
          captionItem.appendChild(captionText);
          captionItem.appendChild(copyButton);
          listItem.appendChild(captionItem);
          captionList.appendChild(listItem);
      } else {
          captionList.innerHTML = '<li>No caption generated.</li>';
      }

  } catch (error) {
      captionList.innerHTML = '<li>An error occurred while generating the caption.</li>';
      console.error('Error:', error);
  }
});
