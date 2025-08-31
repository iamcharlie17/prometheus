import FileUploader from "@/components/FileUploader";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
      <FileUploader />
    </div>
  );
}
