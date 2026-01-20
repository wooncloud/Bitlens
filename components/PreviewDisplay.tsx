interface PreviewDisplayProps {
  pixelatedUrl: string;
  isProcessing: boolean;
  previewUrl: string;
}

export default function PreviewDisplay({
  pixelatedUrl,
  isProcessing,
  previewUrl,
}: PreviewDisplayProps) {
  return (
    <div className="lg:col-span-2">
      {/* Pixelated Preview */}
      <div className="nes-container is-rounded with-title">
        <p className="title text-xs">Preview</p>
        <div className="flex justify-center items-center h-[400px] md:h-[600px] bg-black/20 rounded p-4">
          {isProcessing ? (
            <div className="text-center">
              <p className="text-xs mb-2">Processing...</p>
              <div className="nes-text is-primary text-xs">⏳</div>
            </div>
          ) : pixelatedUrl ? (
            <img
              src={pixelatedUrl}
              alt="Pixelated preview"
              className="pixelated w-full h-full object-contain"
            />
          ) : (
            <p className="text-xs text-gray-400">Processing your image...</p>
          )}
        </div>
      </div>

      {/* Original Image (small reference) */}
      {previewUrl && (
        <div className="mt-4 nes-container is-rounded">
          <p className="text-xs mb-2 text-gray-400">Original:</p>
          <img
            src={previewUrl}
            alt="Original preview"
            className="max-w-full max-h-32 object-contain mx-auto"
          />
        </div>
      )}
    </div>
  );
}
