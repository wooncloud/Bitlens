'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PixelConverter } from '@/lib/pixelConverter';
import { Resolution, PaletteType, DitheringLevel } from '@/lib/types';
import UploadZone from '@/components/UploadZone';
import ResolutionSelector from '@/components/ResolutionSelector';
import PaletteSelector from '@/components/PaletteSelector';
import DitheringSelector from '@/components/DitheringSelector';
import PreviewDisplay from '@/components/PreviewDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [pixelatedUrl, setPixelatedUrl] = useState<string>('');
  const [resolution, setResolution] = useState<Resolution>(128);
  const [palette, setPalette] = useState<PaletteType>('classic-grey');
  const [dithering, setDithering] = useState<DitheringLevel>('none');
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
              <DitheringSelector value={dithering} onChange={setDithering} />

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
            <PreviewDisplay
              pixelatedUrl={pixelatedUrl}
              isProcessing={isProcessing}
              previewUrl={previewUrl}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
