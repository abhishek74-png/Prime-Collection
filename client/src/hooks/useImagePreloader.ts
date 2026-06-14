import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ImageSequenceState {
  images: HTMLImageElement[];
  progress: number;
  loaded: boolean;
  error: Error | null;
}

export interface ImageSequenceOptions {
  folder: string;
  frameCount: number;
  prefix?: string;
  suffix?: string;
  extension?: 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif';
  enabled?: boolean;
}

const imageCache = new Map<string, HTMLImageElement>();

const formatFrame = (index: number, frameCount: number) =>
  String(index).padStart(Math.max(3, String(frameCount).length), '0');

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const cached = imageCache.get(src);
    if (cached?.complete && cached.naturalWidth > 0) {
      resolve(cached);
      return;
    }

    const image = new Image();
    image.decoding = 'async';
    image.loading = 'eager';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load sequence frame: ${src}`));
    image.src = src;
    imageCache.set(src, image);
  });

export const preloadImageSequence = async (
  options: ImageSequenceOptions,
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> => {
  const {
    folder,
    frameCount,
    prefix = 'ezgif-frame-',
    suffix = '',
    extension = 'jpg',
    enabled = true
  } = options;

  if (!enabled) return [];
  if (!Number.isFinite(frameCount) || frameCount <= 0) {
    throw new Error('frameCount must be a positive number');
  }

  const frames: HTMLImageElement[] = [];
  for (let index = 1; index <= frameCount; index += 1) {
    const src = `${folder}/${prefix}${formatFrame(index, frameCount)}${suffix}.${extension}`;
    const image = await loadImage(src);
    frames.push(image);
    onProgress?.(index / frameCount);
    await new Promise(requestAnimationFrame);
  }

  return frames;
};

export const useImagePreloader = (options: ImageSequenceOptions) => {
  const {
    folder,
    frameCount,
    prefix = 'ezgif-frame-',
    suffix = '',
    extension = 'jpg',
    enabled = true
  } = options;

  const sequenceOptions = useMemo(
    () => ({ folder, frameCount, prefix, suffix, extension, enabled }),
    [enabled, extension, folder, frameCount, prefix, suffix]
  );
  const [state, setState] = useState<ImageSequenceState>({
    images: [],
    progress: 0,
    loaded: false,
    error: null
  });

  const load = useCallback(async () => {
    setState((current) => ({
      images: current.images,
      progress: 0,
      loaded: false,
      error: null
    }));

    try {
      const images = await preloadImageSequence(sequenceOptions, (progress) => {
        setState((current) => ({
          images: current.images,
          progress,
          loaded: false,
          error: null
        }));
      });

      setState({ images, progress: 1, loaded: true, error: null });
    } catch (error) {
      setState({ images: [], progress: 0, loaded: false, error: error instanceof Error ? error : new Error('Unable to load image sequence') });
    }
  }, [sequenceOptions]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
};
