

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div>
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl">120</p>
        </div>
      </div>
      {/* Repeat for other widgets */}
    </div>
  );
}
