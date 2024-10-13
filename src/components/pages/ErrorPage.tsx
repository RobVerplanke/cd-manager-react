function ErrorPage({ error }: { error: string }) {
  return <h2>Something went wrong: {error}</h2>;
}

export default ErrorPage;
