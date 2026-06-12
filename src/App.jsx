import { useEffect, useState } from 'react';
import AsciiViewer from './components/AsciiViewer.jsx';
import Loader from './components/Loader.jsx';
import UploadForm from './components/UploadForm.jsx';
import { generateAscii, getApiErrorMessage } from './services/api.js';

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 0;

function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [colors, setColors] = useState(true);
  const [asciiHtml, setAsciiHtml] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!image) {
      setImagePreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  function handleImageChange(event) {
    const selectedImage = event.target.files?.[0] || null;
    setImage(selectedImage);
    setAsciiHtml('');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!image) {
      setError('Selecciona una imagen antes de generar el ASCII.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAsciiHtml('');

    try {
      const data = await generateAscii({
        image,
        width: Number(width),
        height: Number(height),
        colors,
      });

      setAsciiHtml(data.html || '');
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="appShell">
      <section className="toolbar" aria-labelledby="page-title">
        <div>
          {/* <p className="eyebrow">jp2a + Django REST</p> */}
          <h1 id="page-title">Generador de arte ASCII</h1>
        </div>

        <UploadForm
          width={width}
          height={height}
          colors={colors}
          isLoading={isLoading}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onColorsChange={setColors}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
        />
      </section>

      {error ? (
        <div className="alert" role="alert">
          {error}
        </div>
      ) : null}

      {isLoading ? <Loader /> : null}

      <AsciiViewer html={asciiHtml} imagePreview={imagePreview} colors={colors} />
    </main>
  );
}

export default App;
