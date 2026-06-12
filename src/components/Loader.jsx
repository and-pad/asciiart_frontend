function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span>Procesando imagen...</span>
    </div>
  );
}

export default Loader;
