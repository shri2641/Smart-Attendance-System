const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
    <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground text-sm">This section is coming soon.</p>
  </div>
);

export default PlaceholderPage;
