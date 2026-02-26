import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, Delete, Equal, RotateCcw } from "lucide-react";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const handleClear = () => setDisplay("");

  const handleDelete = useCallback(() => {
    setDisplay((prev) => prev.slice(0, -1));
  }, []);

  const handleNegative = () => {
    if (display) {
      if (display.startsWith("-")) {
        setDisplay(display.slice(1));
      } else {
        setDisplay("-" + display);
      }
    }
  };

  const handlePercent = useCallback(() => {
    if (display) {
      try {
        const val = Number(evaluateExpression(display));
        setDisplay(String(val / 100));
      } catch (e) {
        setDisplay("Erreur");
      }
    }
  }, [display]);

  const evaluateExpression = (expr: string) => {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + expr)();
  };

  const handleEquals = useCallback(() => {
    if (!display) return;
    try {
      const result = evaluateExpression(display);
      // Format number to avoid long decimals
      const formatted = Number.isInteger(result)
        ? String(result)
        : Number(result).toFixed(4).replace(/\\.?0+$/, "");
      setDisplay(formatted);
    } catch (e) {
      setDisplay("Erreur");
      setTimeout(() => setDisplay(""), 1500);
    }
  }, [display]);

  const handleClick = useCallback((val: string) => {
    setDisplay((prev) => {
      if (prev === "Erreur") return val;
      return prev + val;
    });
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9+*/.-]/.test(key)) {
        handleClick(key === "*" ? "*" : key);
      } else if (key === "Enter" || key === "=") {
        handleEquals();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key === "Escape") {
        handleClear();
      } else if (key === "%") {
        handlePercent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick, handleEquals, handleDelete, handleClear, handlePercent]);

  const Button = ({
    onClick,
    children,
    variant = "default",
    className = ""
  }: {
    onClick: () => void,
    children: React.ReactNode,
    variant?: "default" | "operator" | "action" | "equals",
    className?: string
  }) => {
    const baseStyle = "flex items-center justify-center text-xl font-medium rounded-2xl transition-all duration-200 active:scale-95";
    const variants = {
      default: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
      operator: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30",
      action: "bg-neutral-700 text-neutral-300 hover:bg-neutral-600",
      equals: "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25",
    };

    return (
      <button
        onClick={onClick}
        className={`\${baseStyle} \${variants[variant]} \${className} h-16`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans md:pt-20 pt-16 flex flex-col relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-neutral-900/60 backdrop-blur-2xl border border-neutral-800 rounded-[2.5rem] p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-6 text-indigo-400 pl-2">
            <CalcIcon className="w-5 h-5" />
            <span className="font-medium">Calculatrice</span>
          </div>

          <div className="bg-neutral-950/50 border border-neutral-800 rounded-3xl p-6 mb-6 h-28 flex items-end justify-end overflow-hidden">
            <span className="text-5xl font-light tracking-tight truncate">
              {display || "0"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button variant="action" onClick={handleClear}>C</Button>
            <Button variant="action" onClick={handleNegative}>+/-</Button>
            <Button variant="action" onClick={handlePercent}>%</Button>
            <Button variant="operator" onClick={() => handleClick("/")}>÷</Button>

            <Button onClick={() => handleClick("7")}>7</Button>
            <Button onClick={() => handleClick("8")}>8</Button>
            <Button onClick={() => handleClick("9")}>9</Button>
            <Button variant="operator" onClick={() => handleClick("*")}>×</Button>

            <Button onClick={() => handleClick("4")}>4</Button>
            <Button onClick={() => handleClick("5")}>5</Button>
            <Button onClick={() => handleClick("6")}>6</Button>
            <Button variant="operator" onClick={() => handleClick("-")}>−</Button>

            <Button onClick={() => handleClick("1")}>1</Button>
            <Button onClick={() => handleClick("2")}>2</Button>
            <Button onClick={() => handleClick("3")}>3</Button>
            <Button variant="operator" onClick={() => handleClick("+")}>+</Button>

            <Button onClick={() => handleClick("0")} className="col-span-2">0</Button>
            <Button onClick={() => handleClick(".")}>.</Button>
            <Button variant="equals" onClick={handleEquals}>=</Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
