'use client';

import { useState, useRef, useEffect } from 'react';
import { PixelConverter } from '@/lib/pixelConverter';
import { Resolution, PaletteType } from '@/lib/types';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [pixelatedUrl, setPixelatedUrl] = useState<string>('');
  const [resolution, setResolution] = useState<Resolution>(128);
  const [palette, setPalette] = useState<PaletteType>('cyberpunk');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const converterRef = useRef<PixelConverter | null>(null);

  // Initialize converter on client side
  useEffect(() => {
    converterRef.current = new PixelConverter();
  }, []);

  // Process image whenever file, resolution, or palette changes
  useEffect(() => {
    if (selectedFile && converterRef.current) {
      processImage();
    }
  }, [selectedFile, resolution, palette]);

  const processImage = async () => {
    if (!selectedFile || !converterRef.current) return;

    setIsProcessing(true);
    try {
      const result = await converterRef.current.convertImage(selectedFile, {
        resolution,
        palette,
      });
      setPixelatedUrl(result);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDownload = async () => {
    if (!pixelatedUrl || !converterRef.current) return;

    try {
      // Upscale to 1080px for high-quality download
      const upscaledUrl = await converterRef.current.upscaleForDownload(pixelatedUrl, 1080);

      // Trigger download
      const link = document.createElement('a');
      link.href = upscaledUrl;
      link.download = `bitlens-${resolution}px-${palette}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl mb-4">BitLens</h1>
        <p className="text-xs md:text-sm text-gray-400 mb-2">
          Focus on the Pixels, not Megapixels
        </p>
        <p className="text-xs text-gray-500">
          세상을 16비트 렌즈로 투영하다
        </p>
      </div>

      {/* Upload Zone */}
      {!selectedFile && (
        <div className="max-w-2xl mx-auto mb-8">
          <div
            className={`nes-container is-rounded ${
              isDragging ? 'is-dark' : ''
            } p-8 text-center cursor-pointer transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-sm mb-4">
              {isDragging ? '📥 Drop it here!' : '📷 Upload Image'}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Drag & drop or click to select
            </p>
            <button className="nes-btn is-primary text-xs">
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Editor View */}
      {selectedFile && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Controls */}
            <div className="lg:col-span-1">
              <div className="nes-container is-rounded with-title mb-6">
                <p className="title text-xs">Resolution</p>
                <div className="space-y-3">
                  {[64, 128, 256].map((res) => (
                    <label key={res} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="nes-radio"
                        name="resolution"
                        checked={resolution === res}
                        onChange={() => setResolution(res as Resolution)}
                      />
                      <span className="text-xs ml-2">{res}px</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="nes-container is-rounded with-title mb-6">
                <p className="title text-xs">Palette</p>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="palette"
                      checked={palette === 'classic-grey'}
                      onChange={() => setPalette('classic-grey')}
                    />
                    <span className="text-xs ml-2">Classic Grey</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="palette"
                      checked={palette === 'greenish'}
                      onChange={() => setPalette('greenish')}
                    />
                    <span className="text-xs ml-2">Greenish</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="palette"
                      checked={palette === 'cyberpunk'}
                      onChange={() => setPalette('cyberpunk')}
                    />
                    <span className="text-xs ml-2">Cyberpunk</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="palette"
                      checked={palette === 'nostalgia'}
                      onChange={() => setPalette('nostalgia')}
                    />
                    <span className="text-xs ml-2">Nostalgia</span>
                  </label>
                </div>
              </div>

              <button
                className="nes-btn is-success w-full text-xs mb-4"
                onClick={handleDownload}
                disabled={!pixelatedUrl || isProcessing}
              >
                {isProcessing ? 'Processing...' : '⬇ Download (1080px)'}
              </button>

              <button
                className="nes-btn w-full text-xs"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                  setPixelatedUrl('');
                }}
              >
                🔄 New Image
              </button>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-2">
              <div className="nes-container is-rounded with-title">
                <p className="title text-xs">Preview</p>
                <div className="flex justify-center items-center min-h-[400px] bg-black/20 rounded p-4">
                  {isProcessing ? (
                    <div className="text-center">
                      <p className="text-xs mb-2">Processing...</p>
                      <div className="nes-text is-primary text-xs">⏳</div>
                    </div>
                  ) : pixelatedUrl ? (
                    <img
                      src={pixelatedUrl}
                      alt="Pixelated preview"
                      className="pixelated max-w-full max-h-[600px] object-contain"
                    />
                  ) : (
                    <p className="text-xs text-gray-400">
                      Processing your image...
                    </p>
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
        <p>Made with 💙 by BitLens</p>
        <p className="mt-2">100% Client-side • No Server Needed</p>
      </footer>
    </main>
  );
}
