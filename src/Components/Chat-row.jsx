function ChatRow() {
  return (
    <div className="flex justify-between items-center px-4 py-3 cursor-pointer border-b border-slate-700 Chat-chatrow-placeholder">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10">
          <img
            src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
            className="w-full h-full rounded-full object-cover"
            alt=""
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold">Tony Moon</h4>
          <p className="text-xs text-slate-400">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
      </div>
      <span className="text-[10px] text-slate-400">14.02.2018</span>
    </div>
  );
}
export default ChatRow;
