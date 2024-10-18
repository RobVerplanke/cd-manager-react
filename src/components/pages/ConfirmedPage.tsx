function ConfirmedPage({ action }: { action: string }) {
  return (
    <div className="flex justify-center pt-60 h-dvh p-6">
      <div className="flex justify-center items-center w-64 h-20 border-2 border-[#48CFCB] rounded-lg">
        <p className="text-2xl pr-2">Item {action}</p>
        <div>
          <img
            src="../src/assets/tick-mark-icon.png"
            alt=""
            width="26"
            height="26"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmedPage;
