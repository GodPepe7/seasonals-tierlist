import TierList from "./components/TierList";
function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-8 xl:mx-auto max-w-[1200px] grid gap-6">
        <TierList />
      </div>
    </div>
  );
}

export default App;