function UploadForm({
  width,
  height,
  colors,
  isLoading,
  onWidthChange,
  onHeightChange,
  onColorsChange,
  onImageChange,
  onSubmit,
}) {
  return (
    <form className="uploadForm" onSubmit={onSubmit}>
      <label className="field">
        <span>Imagen</span>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={onImageChange}
          disabled={isLoading}
          required
        />
      </label>
      
      <div className="formGrid">
        
        <label className="field">
          <span>Ancho</span>          
          <input
            type="number"
            min="0"
            max="500"
            value={width}
            onChange={(event) => onWidthChange(event.target.value)}
            disabled={isLoading}
            required
          />
        </label>

        <label className="field">
          <span>Alto</span>
          <input
            type="number"
            min="0"
            max="500"
            value={height}
            onChange={(event) => onHeightChange(event.target.value)}
            disabled={isLoading}
            required
          />
        </label>
        <span> Si el tamaño de Ancho o Alto es 0, no se deformara la imagen</span>
      </div>

      <label className="checkField">
        <input
          type="checkbox"
          checked={colors}
          onChange={(event) => onColorsChange(event.target.checked)}
          disabled={isLoading}
        />
        <span>Generar con colores</span>
      </label>

      <button type="submit" className="primaryButton" disabled={isLoading}>
        {isLoading ? 'Generando...' : 'Generar ASCII'}
      </button>
    </form>
  );
}

export default UploadForm;
