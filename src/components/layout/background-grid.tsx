/** Fixed grid texture behind every page; the light/dark layers crossfade with the document theme. */
export function BackgroundGrid() {
  return (
    <div aria-hidden className="background-grid">
      <div className="background-grid__layer background-grid__light" />
      <div className="background-grid__layer background-grid__dark" />
    </div>
  );
}
