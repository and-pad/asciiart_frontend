import { useEffect, useState } from 'react';

function AsciiViewer({ html, imagePreview, colors }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const hasResult = Boolean(html);
  const outputClassName = colors
    ? 'asciiOutput'
    : 'asciiOutput asciiOutput--plain';
  const resultPanelClassName = isFullscreen
    ? 'panel panel--fullscreen'
    : 'panel';

  useEffect(() => {
    if (!isFullscreen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('hasFullscreenAscii');

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('hasFullscreenAscii');
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!hasResult) {
      setIsFullscreen(false);
    }
  }, [hasResult]);

  return (
    <section className="viewer" aria-label="Vista previa y resultado ASCII">
      <article className="panel">
        <div className="panel__header">
          <h2>Imagen original</h2>
        </div>
        <div className="previewBox">
          {imagePreview ? (
            <img src={imagePreview} alt="Vista previa de la imagen seleccionada" />
          ) : (
            <p>Selecciona una imagen para ver la vista previa.</p>
          )}
        </div>
      </article>

      <article className={resultPanelClassName}>
        <div className="panel__header">
          <h2>Resultado ASCII</h2>
          {hasResult ? (
            <div className="panel__actions">
              <label className="colorPicker">
                <span>Fondo</span>
                <input
                  aria-label="Color de fondo del resultado ASCII"
                  type="color"
                  value={backgroundColor}
                  onChange={(event) => setBackgroundColor(event.target.value)}
                />
              </label>
              <button
                className="secondaryButton"
                type="button"
                onClick={() => setIsFullscreen((currentValue) => !currentValue)}
              >
                {isFullscreen ? 'Volver' : 'Pantalla completa'}
              </button>
            </div>
          ) : null}
        </div>
        <div className="asciiBox" style={{ backgroundColor }}>
          {hasResult ? (
            <div
              className={outputClassName}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p>El arte ASCII aparecerá aquí después de generar la conversión.</p>
          )}
        </div>
      </article>
    </section>
  );
}

export default AsciiViewer;
