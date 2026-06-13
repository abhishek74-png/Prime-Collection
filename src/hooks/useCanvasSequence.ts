import { useEffect, useRef } from 'react';

export interface CanvasSequenceOptions {
  fit?: 'cover' | 'contain';
  alpha?: number;
  dprCap?: number;
}

export interface UseCanvasSequenceOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  images: HTMLImageElement[];
  progress: number;
  options?: CanvasSequenceOptions;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const drawCover = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let renderWidth: number;
  let renderHeight: number;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    renderHeight = height;
    renderWidth = height * imageRatio;
    offsetX = (width - renderWidth) / 2;
  } else {
    renderWidth = width;
    renderHeight = width / imageRatio;
    offsetY = (height - renderHeight) / 2;
  }

  context.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
};

const drawContain = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let renderWidth: number;
  let renderHeight: number;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    renderWidth = width;
    renderHeight = width / imageRatio;
    offsetY = (height - renderHeight) / 2;
  } else {
    renderHeight = height;
    renderWidth = height * imageRatio;
    offsetX = (width - renderWidth) / 2;
  }

  context.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
};

export const useCanvasSequence = ({
  canvasRef,
  images,
  progress,
  options = {}
}: UseCanvasSequenceOptions) => {
  const frameId = useRef<number | null>(null);
  const progressRef = useRef(progress);
  const imagesRef = useRef(images);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const { fit = 'cover', alpha = 1, dprCap = 2 } = options;

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width === width && canvas.height === height) return;

      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height, dpr };
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const render = () => {
      const { width, height } = canvasSizeRef.current;
      const imageList = imagesRef.current;
      const currentProgress = clamp(progressRef.current);

      context.clearRect(0, 0, width, height);
      context.globalAlpha = alpha;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      if (imageList.length > 0 && width > 0 && height > 0) {
        const frameCount = Math.max(1, imageList.length - 1);
        const frameIndex = Math.min(frameCount, Math.round(currentProgress * frameCount));
        const image = imageList[frameIndex];

        if (fit === 'contain') {
          drawContain(context, image, width, height);
        } else {
          drawCover(context, image, width, height);
        }
      }

      frameId.current = requestAnimationFrame(render);
    };

    frameId.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    };
  }, [alpha, canvasRef, dprCap, fit]);
};
