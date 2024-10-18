function ErrorPage({ error }: { error: string }) {
  return (
    <div className="flex justify-center pt-60 h-dvh p-6">
      <div className="flex justify-center items-center w-auto h-20">
        <div>
          <img
            src="../src/assets/cross-icon.png"
            alt=""
            width="26"
            height="26"
          />
        </div>
        <p className="text-xl px-2">Something went wrong: {error}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
