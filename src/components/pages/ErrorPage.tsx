function ErrorPage({ error }: { error: string }) {
  return (
    <div className="p-6">
      <h2>Something went wrong: {error}</h2>{' '}
    </div>
  );
}

export default ErrorPage;
