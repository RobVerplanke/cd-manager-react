function ConfirmedPage({ action }: { action: string }) {
  return (
    <div className="p-6">
      <h2>Item {action}!</h2>
    </div>
  );
}

export default ConfirmedPage;
