/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useStableCallback } from 'rcl/useStableCallback';
import React, { useEffect, useRef, useState } from 'react';
import { createContext } from '../createContext';
import { useThrottle } from '../useThrottle';

const WIDTH = 960;
const HEIGHT = 540;

const [CanvasRootProvider, useCanvasRoot] =
  createContext<CanvasRootContextValue>('CanvasRoot');

function Canvas() {
  const { canvasRef, startDrawing, endDrawing, draw } = useCanvasRoot('Canvas');

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> =
    useThrottle(draw, 5);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      onMouseMove={handleMouseMove}
      width={WIDTH}
      height={HEIGHT}
      css={css`
        outline: 1px solid black;
      `}
      ref={canvasRef}
    />
  );
}

interface CanvasRootContextValue {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  endDrawing: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  currentStroke: Point[];
  strokes: Stroke[];
  setCurrentStroke: React.Dispatch<React.SetStateAction<Point[]>>;
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
  history: number;
  undo: () => void;
  redo: () => void;
  jumpTo: (to: number) => void;
}

interface CanvasRootProps {
  children: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

function CanvasRoot({ children }: CanvasRootProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState(-1);
  const redrawRef = useRef(false);

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top,
    };
    setCurrentStroke([point]);
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }

  function endDrawing(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!canvasRef.current) return;

    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top,
    };

    setIsDrawing(false);
    setCurrentStroke([...currentStroke, point]);
    const copiedStrokes = JSON.parse(JSON.stringify(strokes));
    const sliceStrokes = copiedStrokes.splice(0, history + 1);
    setStrokes([...sliceStrokes, { points: currentStroke }]);
    setHistory(history + 1);
  }

  const draw = useStableCallback(function draw(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    console.log('draw');

    if (!canvasRef.current) return;

    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top,
    };

    setCurrentStroke([...currentStroke, point]);
    const ctx = canvasRef.current.getContext('2d')!;
    console.log(point);

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  });

  function undo() {
    history > 0 && setHistory(history - 1);
    redrawRef.current = true;
  }

  function redo() {
    history < strokes.length - 1 && setHistory(history + 1);
    redrawRef.current = true;
  }

  function jumpTo(to: number) {
    to >= 0 && to <= strokes.length - 1 && setHistory(to);
    redrawRef.current = true;
  }

  useEffect(() => {
    if (!canvasRef.current || !redrawRef.current) return;

    const ctx = canvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const copiedStrokes = JSON.parse(JSON.stringify(strokes));
    const sliceStrokes = copiedStrokes.splice(0, history + 1);

    for (let i = 0; i < sliceStrokes.length; i++) {
      let points = sliceStrokes[i].points;
      for (let j = 0; j < points.length; j++) {
        if (j === 0) {
          ctx.beginPath();
          ctx.moveTo(points[j].x, points[j].y);
        } else {
          ctx.lineTo(points[j].x, points[j].y);
        }
      }
      ctx.stroke();
    }
    redrawRef.current = false;
  }, [strokes, history]);

  const ctx = {
    canvasRef,
    startDrawing,
    endDrawing,
    draw,
    currentStroke,
    strokes,
    setCurrentStroke,
    setStrokes,
    history,
    undo,
    redo,
    jumpTo,
  };
  return <CanvasRootProvider {...ctx}>{children}</CanvasRootProvider>;
}

function ToolBar() {
  const { strokes, history, undo, redo, jumpTo } = useCanvasRoot('Toolbar');
  return (
    <div>
      <button type="button" onClick={undo} disabled={history <= 0}>
        prev
      </button>
      <input
        type="number"
        max={strokes.length}
        min={1}
        onChange={(e) => jumpTo(Number(e.target.value))}
        value={history + 1}
      />
      <button
        type="button"
        onClick={redo}
        disabled={history >= strokes.length - 1}
      >
        next
      </button>
    </div>
  );
}

export { CanvasRoot, Canvas, ToolBar };
