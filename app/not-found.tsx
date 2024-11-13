import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-dark-2 text-white min-h-screen w-full flex justify-center items-center">
      <div className="bg-dark-3 flex flex-col gap-4 items-start justify-between px-6 p-4 rounded-lg">
        <h1 className="text-3xl font-bold leading-loose tracking-widest">
          Not Found
        </h1>
        <div>
          <p className="text-md -tracking-tighter leading-relaxed font-semibold">
            Could not find requested resource
          </p>
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
