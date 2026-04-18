import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  readOnly?: boolean;
  onRun?: () => void;
}

export default function SQLEditor({ 
  value, 
  onChange, 
  height = 300, 
  readOnly = false,
  onRun 
}: SQLEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.max(height, textareaRef.current.scrollHeight) + 'px';
    }
  }, [value, height]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between gap-2 p-3 bg-gray-100 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-700 font-mono">
          <span className="w-6 text-center text-gray-500">📝</span>
          SQL Query Editor
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCopy}
            title="Copy SQL"
            className="h-8 w-8 p-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleReset}
            title="Clear Editor"
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-gray-900 text-gray-100 font-mono text-sm overflow-hidden">
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-950 text-gray-600 text-right pr-3 pt-3 select-none overflow-hidden">
          {value.split('\n').map((_, i) => (
            <div key={i} className="h-6">{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          spellCheck="false"
          style={{
            height: `${height}px`,
            minHeight: `${height}px`,
          }}
          className="w-full pl-16 pr-4 py-3 bg-gray-900 text-gray-100 font-mono text-sm outline-none resize-none placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          placeholder="-- Write your SQL query here
SELECT * FROM users WHERE id = 1;"
        />
      </div>

      {/* Syntax Hints */}
      <div className="px-3 py-2 bg-blue-50 border-t border-blue-200 text-xs text-blue-700 flex items-center gap-2">
        <span>💡</span>
        <span>Tip: Use uppercase for SQL keywords (SELECT, WHERE, FROM) for better readability</span>
      </div>
    </div>
  );
}
