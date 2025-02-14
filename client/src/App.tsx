import "./App.css";

function App() {
  return (
    <main className="grid">
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">severance.rest</h2>
        <p className="mt-2">A free REST API for random Severance quotes</p>
      </div>
      <div className="flex items-center justify-between mx-auto mt-8">
        <div className="mr-20">
          <a href="https://api.severance.rest" target="_blank" className="text-blue-500 hover:underline">
            https://api.severance.rest
          </a>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">tweet</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">refresh</button>
        </div>
      </div>
    </main>
  );
}

export default App;
