'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PixelConverter } from '@/lib/pixelConverter';
import { Resolution, PaletteType } from '@/lib/types';
import UploadZone from '@/components/UploadZone';
import ResolutionSelector from '@/components/ResolutionSelector';
import PaletteSelector from '@/components/PaletteSelector';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [pixelatedUrl, setPixelatedUrl] = useState<string>('');
  const [resolution, setResolution] = useState<Resolution>(128);
  const [palette, setPalette] = useState<PaletteType>('classic-grey');
  const [dithering, setDithering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const converterRef = useRef<PixelConverter | null>(null);

  // Initialize converter on client side
  useEffect(() => {
    converterRef.current = new PixelConverter();
  }, []);

  // Process image whenever file, resolution, palette, or dithering changes
  const processImage = useCallback(async () => {
    if (!selectedFile || !converterRef.current) return;

    setIsProcessing(true);
    try {
      const result = await converterRef.current.convertImage(selectedFile, {
        resolution,
        palette,
        dithering,
      });
      setPixelatedUrl(result);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, resolution, palette, dithering]);

  useEffect(() => {
    if (selectedFile && converterRef.current) {
      processImage();
    }
  }, [selectedFile, processImage]);

  const handleFileSelect = (file: File) => {
    // Cleanup previous preview URL to prevent memory leak
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDownload = async () => {
    if (!pixelatedUrl || !converterRef.current) return;

    try {
      const upscaledUrl = await converterRef.current.upscaleForDownload(pixelatedUrl, 1080);

      const link = document.createElement('a');
      link.href = upscaledUrl;
      link.download = `bitlens-${resolution}px-${palette}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setPixelatedUrl('');
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl mb-4">BitLens</h1>
        <p className="text-xs md:text-sm text-gray-400 mb-2">
          Focus on the Pixels, not Megapixels
        </p>
        <p className="text-xs text-gray-500">See the world through a 16-bit lens</p>
      </div>

      {/* Upload Zone */}
      {!selectedFile && <UploadZone onFileSelect={handleFileSelect} />}

      {/* Editor View */}
      {selectedFile && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Controls */}
            <div className="lg:col-span-1">
              <ResolutionSelector value={resolution} onChange={setResolution} />
              <PaletteSelector value={palette} onChange={setPalette} />

              {/* Dithering Toggle */}
              <div className="nes-container is-rounded with-title mb-6">
                <p className="title text-xs">Dithering</p>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="nes-checkbox"
                    checked={dithering}
                    onChange={(e) => setDithering(e.target.checked)}
                  />
                  <span className="text-xs ml-2">Enable Floyd-Steinberg</span>
                </label>
              </div>

              <button
                className="nes-btn is-success w-full text-xs mb-4"
                onClick={handleDownload}
                disabled={!pixelatedUrl || isProcessing}
              >
                {isProcessing ? 'Processing...' : '⬇ Download (1080px)'}
              </button>

              <button className="nes-btn w-full text-xs" onClick={handleReset}>
                🔄 New Image
              </button>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2">
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
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-12 text-xs text-gray-500">
        <p className="mb-2">100% Client-side • No Server Needed</p>
        <p className="mb-1">
          Made by{' '}
          <a
            href="https://wooncloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            wooncloud
          </a>
        </p>
        <p className="text-xs">© {new Date().getFullYear()} BitLens. All rights reserved.</p>
      </footer>
    </main>
  );
}
