import React, { useState } from 'react';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    if (firstOperand === null || operator === null) return parseFloat(display);

    const secondOperand = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '*':
        result = firstOperand * secondOperand;
        break;
      case '/':
        result = firstOperand / secondOperand;
        break;
      default:
        return secondOperand;
    }

    return result;
  };

  const calculate = () => {
    if (firstOperand === null || operator === null) return;

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <div style={styles.calculator}>
      <div style={styles.display}>{display}</div>
      <div style={styles.keypad}>
        <button style={styles.button} onClick={clearDisplay}>C</button>
        <button style={styles.button} onClick={() => setDisplay(display.charAt(0) === '-' ? display.substring(1) : '-' + display)}>+/-</button>
        <button style={styles.button} onClick={() => handleOperator('%')}>%</button>
        <button style={styles.operatorButton} onClick={() => handleOperator('/')}>÷</button>

        <button style={styles.button} onClick={() => inputDigit('7')}>7</button>
        <button style={styles.button} onClick={() => inputDigit('8')}>8</button>
        <button style={styles.button} onClick={() => inputDigit('9')}>9</button>
        <button style={styles.operatorButton} onClick={() => handleOperator('*')}>×</button>

        <button style={styles.button} onClick={() => inputDigit('4')}>4</button>
        <button style={styles.button} onClick={() => inputDigit('5')}>5</button>
        <button style={styles.button} onClick={() => inputDigit('6')}>6</button>
        <button style={styles.operatorButton} onClick={() => handleOperator('-')}>-</button>

        <button style={styles.button} onClick={() => inputDigit('1')}>1</button>
        <button style={styles.button} onClick={() => inputDigit('2')}>2</button>
        <button style={styles.button} onClick={() => inputDigit('3')}>3</button>
        <button style={styles.operatorButton} onClick={() => handleOperator('+')}>+</button>

        <button style={styles.zeroButton} onClick={() => inputDigit('0')}>0</button>
        <button style={styles.button} onClick={inputDecimal}>.</button>
        <button style={styles.operatorButton} onClick={calculate}>=</button>
      </div>
    </div>
  );
};

const styles = {
  calculator: {
    width: '280px',
    margin: '0 auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
  },
  display: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'right' as const,
    padding: '20px',
    fontSize: '24px',
    fontWeight: 'bold' as const,
    minHeight: '30px',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    backgroundColor: '#999',
  },
  button: {
    border: 'none',
    backgroundColor: '#f9f9f9',
    fontSize: '18px',
    padding: '20px 0',
    cursor: 'pointer',
    outline: 'none',
  },
  operatorButton: {
    border: 'none',
    backgroundColor: '#ff9500',
    color: 'white',
    fontSize: '18px',
    padding: '20px 0',
    cursor: 'pointer',
    outline: 'none',
  },
  zeroButton: {
    border: 'none',
    backgroundColor: '#f9f9f9',
    fontSize: '18px',
    padding: '20px 0',
    cursor: 'pointer',
    outline: 'none',
    gridColumn: 'span 2',
  },
};

export default App;